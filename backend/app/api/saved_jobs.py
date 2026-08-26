from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.saved_job import SavedJob
from app.models.job import Job
from app.schemas.profile import SavedJobResponse
from app.api.deps import get_current_user
from app.models.user import User

router = APIRouter(prefix="/saved-jobs", tags=["Saved Jobs"])


@router.get("", response_model=list[SavedJobResponse])
def list_saved_jobs(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    saved = (
        db.query(SavedJob)
        .filter(SavedJob.user_id == current_user.id)
        .order_by(SavedJob.created_at.desc())
        .all()
    )
    result = []
    for s in saved:
        job = db.query(Job).filter(Job.id == s.job_id).first()
        result.append(
            SavedJobResponse(
                id=s.id,
                job_id=s.job_id,
                created_at=s.created_at,
                job={
                    "id": job.id,
                    "title": job.title,
                    "company": job.company,
                    "location": job.location,
                    "job_type": job.job_type,
                    "salary_min": job.salary_min,
                    "salary_max": job.salary_max,
                    "remote_type": job.remote_type,
                    "skills": job.skills,
                    "created_at": job.created_at.isoformat(),
                }
                if job
                else None,
            )
        )
    return result


@router.post("/{job_id}", response_model=SavedJobResponse, status_code=status.HTTP_201_CREATED)
def save_job(
    job_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    job = db.query(Job).filter(Job.id == job_id).first()
    if not job:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found")

    existing = (
        db.query(SavedJob)
        .filter(SavedJob.user_id == current_user.id, SavedJob.job_id == job_id)
        .first()
    )
    if existing:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Job already saved")

    saved = SavedJob(user_id=current_user.id, job_id=job_id)
    db.add(saved)
    db.commit()
    db.refresh(saved)

    return SavedJobResponse(
        id=saved.id,
        job_id=saved.job_id,
        created_at=saved.created_at,
        job={
            "id": job.id,
            "title": job.title,
            "company": job.company,
            "location": job.location,
            "job_type": job.job_type,
            "salary_min": job.salary_min,
            "salary_max": job.salary_max,
            "remote_type": job.remote_type,
            "skills": job.skills,
            "created_at": job.created_at.isoformat(),
        },
    )


@router.delete("/{job_id}", status_code=status.HTTP_204_NO_CONTENT)
def unsave_job(
    job_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    saved = (
        db.query(SavedJob)
        .filter(SavedJob.user_id == current_user.id, SavedJob.job_id == job_id)
        .first()
    )
    if not saved:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Saved job not found")
    db.delete(saved)
    db.commit()
