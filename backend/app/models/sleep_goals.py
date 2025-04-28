# backend/app/models/sleep_goals.py
from sqlalchemy import Column, Integer, String, Float, ForeignKey, Time
from sqlalchemy.orm import relationship

from backend.app.models.base import Base, TimestampMixin


class SleepGoals(Base, TimestampMixin):
    """Model for storing user's sleep goals and targets."""

    __tablename__ = "sleep_goals"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, unique=True)

    # Target sleep times
    bedtime = Column(Time)
    wake_time = Column(Time)
    sleep_duration = Column(Float)  # target hours of sleep

    # Sleep window (for restriction therapy)
    current_sleep_window = Column(Integer)  # in minutes

    # Relationships
    user = relationship("User", back_populates="sleep_goals")

    def __repr__(self):
        return f"<SleepGoals for user {self.user_id}>"
