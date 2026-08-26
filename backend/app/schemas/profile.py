from datetime import datetime
from typing import Optional
from pydantic import BaseModel


class ProfileUpdate(BaseModel):
    skills: Optional[str] = None
    experience: Optional[str] = None
    education: Optional[str] = None
    preferred_locations: Optional[str] = None
    preferred_job_types: Optional[str] = None
    avatar_url: Optional[str] = None


class ProfileResponse(BaseModel):
    id: str
    user_id: str
    skills: Optional[str]
    experience: Optional[str]
    education: Optional[str]
    preferred_locations: Optional[str]
    preferred_job_types: Optional[str]
    avatar_url: Optional[str]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class SavedJobResponse(BaseModel):
    id: str
    job_id: str
    created_at: datetime
    job: Optional[dict] = None

    class Config:
        from_attributes = True


class DashboardStats(BaseModel):
    total_applications: int
    active_applications: int
    interviews: int
    offers: int
    rejections: int
    saved_jobs: int
    response_rate: float
    interview_rate: float
    applications_over_time: list[dict]
    applications_by_status: list[dict]
    conversion_funnel: list[dict]
