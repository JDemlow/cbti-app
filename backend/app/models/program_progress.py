# backend/app/models/sleep_diary.py
from sqlalchemy import Column, Integer, String, Float, DateTime, Text, ForeignKey, Time
from sqlalchemy.orm import relationship
from datetime import time, date

from backend.app.models.base import Base, TimestampMixin


class SleepDiary(Base, TimestampMixin):
    """Model for storing daily sleep diary entries."""

    __tablename__ = "sleep_diaries"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    date = Column(DateTime, nullable=False, index=True)

    # Bedtime information
    bed_time = Column(Time, nullable=False)
    fall_asleep_time = Column(Time, nullable=False)

    # Wake time information
    wake_time = Column(Time, nullable=False)
    get_up_time = Column(Time, nullable=False)

    # Sleep metrics
    awakenings = Column(Integer, default=0)
    total_awake_time = Column(Integer, default=0)  # in minutes
    sleep_quality = Column(Integer)  # 1-5 rating
    restedness = Column(Integer)  # 1-5 rating
    mood = Column(Integer)  # 1-5 rating

    # Calculated fields (can be computed or stored)
    time_in_bed = Column(Integer)  # in minutes
    total_sleep_time = Column(Integer)  # in minutes
    sleep_efficiency = Column(Float)  # percentage

    notes = Column(Text)

    # Relationships
    user = relationship("User", back_populates="sleep_diaries")

    def __repr__(self):
        return f"<SleepDiary {self.date} for user {self.user_id}>"
