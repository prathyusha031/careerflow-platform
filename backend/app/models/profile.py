import uuid
from datetime import datetime, timezone

from sqlalchemy import String, DateTime, Text, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.session import Base


class Profile(Base):
    __tablename__ = "profiles"

    id: Mapped[str] = mapped_column(
        String(36), primary_key=True, default=lambda: str(uuid.uuid4())
    )
    user_id: Mapped[str] = mapped_column(
        String(36), ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False
    )
    skills: Mapped[str] = mapped_column(Text, nullable=True)  # JSON string
    experience: Mapped[str] = mapped_column(Text, nullable=True)
    education: Mapped[str] = mapped_column(Text, nullable=True)
    preferred_locations: Mapped[str] = mapped_column(Text, nullable=True)  # JSON string
    preferred_job_types: Mapped[str] = mapped_column(Text, nullable=True)  # JSON string
    avatar_url: Mapped[str] = mapped_column(String(500), nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )

    user = relationship("User", back_populates="profile")
