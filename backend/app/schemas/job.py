from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field


class JobCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=255)
    company: str = Field(..., min_length=1, max_length=255)
    location: str = Field(..., min_length=1, max_length=255)
    description: str = Field(..., min_length=1)
    requirements: str = Field(..., min_length=1)
    responsibilities: Optional[str] = None
    salary_min: Optional[int] = None
    salary_max: Optional[int] = None
    job_type: str = Field(..., pattern="^(full-time|part-time|contract|internship)$")
    experience_level: str = Field(..., pattern="^(entry|mid|senior|lead)$")
    remote_type: str = Field(default="onsite", pattern="^(remote|hybrid|onsite)$")
    skills: Optional[str] = None
    benefits: Optional[str] = None


class JobUpdate(BaseModel):
    title: Optional[str] = None
    company: Optional[str] = None
    location: Optional[str] = None
    description: Optional[str] = None
    requirements: Optional[str] = None
    responsibilities: Optional[str] = None
    salary_min: Optional[int] = None
    salary_max: Optional[int] = None
    job_type: Optional[str] = None
    experience_level: Optional[str] = None
    remote_type: Optional[str] = None
    skills: Optional[str] = None
    benefits: Optional[str] = None


class JobResponse(BaseModel):
    id: str
    title: str
    company: str
    location: str
    description: str
    requirements: str
    responsibilities: Optional[str]
    salary_min: Optional[int]
    salary_max: Optional[int]
    job_type: str
    experience_level: str
    remote_type: str
    skills: Optional[str]
    benefits: Optional[str]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class JobListResponse(BaseModel):
    jobs: list[JobResponse]
    total: int
    page: int
    per_page: int
    pages: int
