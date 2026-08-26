from app.models.notification import Notification
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.application import Application
from app.models.job import Job
from app.schemas.application import (
    ApplicationCreate,
    ApplicationUpdate,
    ApplicationResponse,
    ApplicationListResponse,
)
from app.api.deps import get_current_user
from app.models.user import User

router = APIRouter(prefix="/applications", tags=["Applications"])


def _application_response(app: Application, db: Session) -> ApplicationResponse:
    job = db.query(Job).filter(Job.id == app.job_id).first()
    return ApplicationResponse(
        id=app.id,
        user_id=app.user_id,
        job_id=app.job_id,
        status=app.status,
        applied_at=app.applied_at,
        notes=app.notes,
        next_action=app.next_action,
        interview_date=app.interview_date,
        recruiter_name=app.recruiter_name,
        recruiter_email=app.recruiter_email,
        job_url=app.job_url,
        created_at=app.created_at,
        updated_at=app.updated_at,
        job={
            "id": job.id,
            "title": job.title,
            "company": job.company,
            "location": job.location,
            "job_type": job.job_type,
            "salary_min": job.salary_min,
            "salary_max": job.salary_max,
        }
        if job
        else None,
    )


@router.get("", response_model=ApplicationListResponse)
def list_applications(
    page: int = Query(1, ge=1),
    per_page: int = Query(50, ge=1, le=100),
    status_filter: str = Query(None, alias="status"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    query = db.query(Application).filter(Application.user_id == current_user.id)

    if status_filter:
        query = query.filter(Application.status == status_filter)

    total = query.count()
    applications = (
        query.order_by(Application.created_at.desc())
        .offset((page - 1) * per_page)
        .limit(per_page)
        .all()
    )

    return ApplicationListResponse(
        applications=[_application_response(a, db) for a in applications],
        total=total,
    )


@router.post("", response_model=ApplicationResponse, status_code=status.HTTP_201_CREATED)
def create_application(
    payload: ApplicationCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    job = db.query(Job).filter(Job.id == payload.job_id).first()
    if not job:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found")

    existing = (
        db.query(Application)
        .filter(
            Application.user_id == current_user.id,
            Application.job_id == payload.job_id,
        )
        .first()
    )
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="You have already applied to this job",
        )

    application = Application(
        user_id=current_user.id,
        job_id=payload.job_id,
        notes=payload.notes,
        next_action=payload.next_action,
        interview_date=payload.interview_date,
        recruiter_name=payload.recruiter_name,
        recruiter_email=payload.recruiter_email,
        job_url=payload.job_url,
    )
    db.add(application)

    notification = Notification(
    user_id=current_user.id,
    title="Application Submitted",
    message=f"Your application for {job.title} at {job.company} was added to your tracker.",
    notification_type="info",
    )
    db.add(notification)

    db.commit()
    db.refresh(application)
    return _application_response(application, db)


@router.get("/{application_id}", response_model=ApplicationResponse)
def get_application(
    application_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    app = (
        db.query(Application)
        .filter(
            Application.id == application_id,
            Application.user_id == current_user.id,
        )
        .first()
    )
    if not app:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Application not found")
    return _application_response(app, db)


@router.put("/{application_id}", response_model=ApplicationResponse)
def update_application(
    application_id: str,
    payload: ApplicationUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    app = (
        db.query(Application)
        .filter(
            Application.id == application_id,
            Application.user_id == current_user.id,
        )
        .first()
    )
    if not app:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Application not found")

    update_data = payload.model_dump(exclude_unset=True)

    old_status = app.status
    old_interview_date = app.interview_date

    for key, value in update_data.items():
        setattr(app, key, value)

    job = db.query(Job).filter(Job.id == app.job_id).first()

    if "status" in update_data and update_data["status"] != old_status:
      notification_type = (
        "interview"
        if update_data["status"] == "interview"
        else "info"
      )

    notification = Notification(
        user_id=current_user.id,
        title="Application Status Updated",
        message=(
            f"Your {job.title} application moved "
            f"from {old_status.title()} to {update_data['status'].title()}."
        ),
        notification_type=notification_type,
      )

    db.add(notification)

    if (
       "interview_date" in update_data
        and update_data["interview_date"] is not None
        and update_data["interview_date"] != old_interview_date
    ):
       notification = Notification(
        user_id=current_user.id,
        title="Interview Scheduled",
        message=(
            f"Your interview for {job.title} at {job.company} "
            f"is scheduled for {update_data['interview_date']}."
        ),
        notification_type="interview",
    )

    db.add(notification)

    db.commit()
    db.refresh(app)
    return _application_response(app, db)


@router.delete("/{application_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_application(
    application_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    app = (
        db.query(Application)
        .filter(
            Application.id == application_id,
            Application.user_id == current_user.id,
        )
        .first()
    )
    if not app:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Application not found")
    db.delete(app)
    db.commit()
