# backend/app/models/user.py
from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text
from sqlalchemy.orm import relationship

from backend.app.models.base import Base, TimestampMixin


class User(Base, TimestampMixin):
    """User model for storing user data and authentication information."""

    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    first_name = Column(String(100))
    last_name = Column(String(100))
    phone_number = Column(String(20))
    time_zone = Column(String(50), default="America/New_York")
    week_in_program = Column(Integer, default=1)
    is_active = Column(Boolean, default=True)

    # Relationships
    sleep_diaries = relationship("SleepDiary", back_populates="user")
    sleep_goals = relationship("SleepGoals", back_populates="user", uselist=False)
    program_progress = relationship("ProgramProgress", back_populates="user")

    def __repr__(self):
        return f"<User {self.email}>"
