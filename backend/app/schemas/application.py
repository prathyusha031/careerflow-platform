from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field


class ApplicationCreate(BaseModel):
    job_id: str = Field(..., min_length=1)
    notes: Optional[str] = None
    next_action: Optional[str] = None
    interview_date: Optional[datetime] = None
    recruiter_name: Optional[str] = None
    recruiter_email: Optional[str] = None
    job_url: Optional[str] = None


class ApplicationUpdate(BaseModel):
    status: Optional[str] = Field(
        None, pattern="^(applied|screening|interview|technical|final|offer|rejected)$"
    )
    notes: Optional[str] = None
    next_action: Optional[str] = None
    interview_date: Optional[datetime] = None
    recruiter_name: Optional[str] = None
    recruiter_email: Optional[str] = None


class ApplicationResponse(BaseModel):
    id: str
    user_id: str
    job_id: str
    status: str
    applied_at: datetime
    notes: Optional[str]
    next_action: Optional[str]
    interview_date: Optional[datetime]
    recruiter_name: Optional[str]
    recruiter_email: Optional[str]
    job_url: Optional[str]
    created_at: datetime
    updated_at: datetime
    job: Optional[dict] = None

    class Config:
        from_attributes = True


class ApplicationListResponse(BaseModel):
    applications: list[ApplicationResponse]
    total: int
