from datetime import datetime, timedelta, timezone
from collections import defaultdict

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.db.session import get_db
from app.models.application import Application
from app.models.saved_job import SavedJob
from app.models.user import User
from app.schemas.profile import DashboardStats
from app.api.deps import get_current_user

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


@router.get("", response_model=DashboardStats)
def get_dashboard(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    apps = db.query(Application).filter(Application.user_id == current_user.id).all()
    saved_count = db.query(SavedJob).filter(SavedJob.user_id == current_user.id).count()

    total = len(apps)
    active_statuses = {"applied", "screening", "interview", "technical", "final"}
    active = sum(1 for a in apps if a.status in active_statuses)
    interviews = sum(1 for a in apps if a.status == "interview")
    offers = sum(1 for a in apps if a.status == "offer")
    rejections = sum(1 for a in apps if a.status == "rejected")

    responded = total - sum(1 for a in apps if a.status == "applied")
    response_rate = (responded / total * 100) if total > 0 else 0.0
    interview_rate = (interviews / total * 100) if total > 0 else 0.0

    # Applications over time (last 6 months)
    now = datetime.now(timezone.utc)
    apps_over_time = []
    status_counts = defaultdict(int)
    for i in range(5, -1, -1):
        month_start = (now - timedelta(days=30 * i)).replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        month_end = (month_start + timedelta(days=32)).replace(day=1, hour=0, minute=0, second=0, microsecond=0)
        count = sum(
            1
            for a in apps
            if a.applied_at and month_start <= a.applied_at.replace(tzinfo=timezone.utc) < month_end
        )
        apps_over_time.append({
            "month": month_start.strftime("%b %Y"),
            "count": count,
        })

    for a in apps:
        status_counts[a.status] += 1

    status_labels = {
        "applied": "Applied",
        "screening": "Screening",
        "interview": "Interview",
        "technical": "Technical",
        "final": "Final Round",
        "offer": "Offer",
        "rejected": "Rejected",
    }
    applications_by_status = [
        {"status": status_labels.get(s, s), "count": c}
        for s, c in sorted(status_counts.items(), key=lambda x: -x[1])
    ]

    conversion_funnel = [
        {"stage": "Applied", "count": total},
        {"stage": "Screened", "count": status_counts.get("screening", 0) + status_counts.get("interview", 0) + status_counts.get("technical", 0) + status_counts.get("final", 0) + status_counts.get("offer", 0)},
        {"stage": "Interview", "count": interviews + status_counts.get("technical", 0) + status_counts.get("final", 0) + status_counts.get("offer", 0)},
        {"stage": "Offer", "count": offers},
    ]

    return DashboardStats(
        total_applications=total,
        active_applications=active,
        interviews=interviews,
        offers=offers,
        rejections=rejections,
        saved_jobs=saved_count,
        response_rate=round(response_rate, 1),
        interview_rate=round(interview_rate, 1),
        applications_over_time=apps_over_time,
        applications_by_status=applications_by_status,
        conversion_funnel=conversion_funnel,
    )
