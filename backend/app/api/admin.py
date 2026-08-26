from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
import math

from app.db.session import get_db
from app.models.user import User
from app.models.job import Job
from app.models.application import Application
from app.schemas.user import UserResponse
from app.schemas.job import JobResponse, JobCreate, JobUpdate, JobListResponse
from app.api.deps import get_current_admin_user

router = APIRouter(prefix="/admin", tags=["Admin"])


@router.get("/users", response_model=list[UserResponse])
def list_users(
    page: int = Query(1, ge=1),
    per_page: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_admin_user),
):
    users = db.query(User).offset((page - 1) * per_page).limit(per_page).all()
    return [UserResponse.model_validate(u) for u in users]


@router.get("/applications")
def list_all_applications(
    page: int = Query(1, ge=1),
    per_page: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_admin_user),
):
    total = db.query(Application).count()
    applications = (
        db.query(Application)
        .order_by(Application.created_at.desc())
        .offset((page - 1) * per_page)
        .limit(per_page)
        .all()
    )
    return {
        "applications": [
            {
                "id": a.id,
                "user_id": a.user_id,
                "job_id": a.job_id,
                "status": a.status,
                "applied_at": a.applied_at.isoformat() if a.applied_at else None,
                "created_at": a.created_at.isoformat() if a.created_at else None,
            }
            for a in applications
        ],
        "total": total,
        "page": page,
        "pages": math.ceil(total / per_page) if total > 0 else 1,
    }


@router.post("/jobs", response_model=JobResponse, status_code=status.HTTP_201_CREATED)
def admin_create_job(
    payload: JobCreate,
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_admin_user),
):
    job = Job(**payload.model_dump())
    db.add(job)
    db.commit()
    db.refresh(job)
    return JobResponse.model_validate(job)


@router.put("/jobs/{job_id}", response_model=JobResponse)
def admin_update_job(
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


@router.delete("/jobs/{job_id}", status_code=status.HTTP_204_NO_CONTENT)
def admin_delete_job(
    job_id: str,
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_admin_user),
):
    job = db.query(Job).filter(Job.id == job_id).first()
    if not job:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found")
    db.delete(job)
    db.commit()
