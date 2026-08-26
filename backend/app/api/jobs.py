import json
import math
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.db.session import get_db
from app.models.job import Job
from app.models.saved_job import SavedJob
from app.schemas.job import JobCreate, JobUpdate, JobResponse, JobListResponse
from app.api.deps import get_current_user, get_current_admin_user
from app.models.user import User

router = APIRouter(prefix="/jobs", tags=["Jobs"])


@router.get("", response_model=JobListResponse)
def list_jobs(
    page: int = Query(1, ge=1),
    per_page: int = Query(12, ge=1, le=50),
    search: Optional[str] = None,
    location: Optional[str] = None,
    job_type: Optional[str] = None,
    experience_level: Optional[str] = None,
    remote_type: Optional[str] = None,
    salary_min: Optional[int] = None,
    salary_max: Optional[int] = None,
    sort: Optional[str] = Query(None, pattern="^(newest|salary_high|salary_low)$"),
    db: Session = Depends(get_db),
):
    query = db.query(Job)

    if search:
        search_term = f"%{search}%"
        query = query.filter(
            (Job.title.ilike(search_term))
            | (Job.company.ilike(search_term))
            | (Job.description.ilike(search_term))
        )

    if location:
        query = query.filter(Job.location.ilike(f"%{location}%"))

    if job_type:
        query = query.filter(Job.job_type == job_type)

    if experience_level:
        query = query.filter(Job.experience_level == experience_level)

    if remote_type:
        query = query.filter(Job.remote_type == remote_type)

    if salary_min:
        query = query.filter(Job.salary_max >= salary_min)

    if salary_max:
        query = query.filter(Job.salary_min <= salary_max)

    if sort == "newest":
        query = query.order_by(Job.created_at.desc())
    elif sort == "salary_high":
        query = query.order_by(Job.salary_max.desc().nullslast())
    elif sort == "salary_low":
        query = query.order_by(Job.salary_min.asc().nullsfirst())
    else:
        query = query.order_by(Job.created_at.desc())

    total = query.count()
    pages = math.ceil(total / per_page) if total > 0 else 1
    jobs = query.offset((page - 1) * per_page).limit(per_page).all()

    return JobListResponse(
        jobs=[JobResponse.model_validate(j) for j in jobs],
        total=total,
        page=page,
        per_page=per_page,
        pages=pages,
    )


@router.get("/{job_id}", response_model=JobResponse)
def get_job(job_id: str, db: Session = Depends(get_db)):
    job = db.query(Job).filter(Job.id == job_id).first()
    if not job:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found")
    return JobResponse.model_validate(job)


@router.post("", response_model=JobResponse, status_code=status.HTTP_201_CREATED)
def create_job(
    payload: JobCreate,
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_admin_user),
):
    job = Job(**payload.model_dump())
    db.add(job)
    db.commit()
    db.refresh(job)
    return JobResponse.model_validate(job)


@router.put("/{job_id}", response_model=JobResponse)
def update_job(
    job_id: str,
    payload: JobUpdate,
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_admin_user),
):
    job = db.query(Job).filter(Job.id == job_id).first()
    if not job:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found")

    update_data = payload.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(job, key, value)

    db.commit()
    db.refresh(job)
    return JobResponse.model_validate(job)


@router.delete("/{job_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_job(
    job_id: str,
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_admin_user),
):
    job = db.query(Job).filter(Job.id == job_id).first()
    if not job:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found")
    db.delete(job)
    db.commit()
