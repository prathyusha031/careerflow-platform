import uuid
from datetime import datetime, timezone

from sqlalchemy import String, DateTime, Integer, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.session import Base


class Job(Base):
    __tablename__ = "jobs"

    id: Mapped[str] = mapped_column(
        String(36), primary_key=True, default=lambda: str(uuid.uuid4())
    )
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    company: Mapped[str] = mapped_column(String(255), nullable=False)
    location: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    requirements: Mapped[str] = mapped_column(Text, nullable=False)
    responsibilities: Mapped[str] = mapped_column(Text, nullable=True)
    salary_min: Mapped[int] = mapped_column(Integer, nullable=True)
    salary_max: Mapped[int] = mapped_column(Integer, nullable=True)
    job_type: Mapped[str] = mapped_column(String(50), nullable=False)  # full-time, part-time, contract, internship
    experience_level: Mapped[str] = mapped_column(String(50), nullable=False)  # entry, mid, senior, lead
    remote_type: Mapped[str] = mapped_column(String(50), default="onsite")  # remote, hybrid, onsite
    skills: Mapped[str] = mapped_column(Text, nullable=True)  # JSON string of skills
    benefits: Mapped[str] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )

    saved_by = relationship("SavedJob", back_populates="job")
    applications = relationship("Application", back_populates="job")
