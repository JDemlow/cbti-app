from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime, Text
from sqlalchemy.orm import relationship

from backend.app.models.base import Base, TimestampMixin


class Activity(Base, TimestampMixin):
    """Model for program activities that users need to complete."""

    __tablename__ = "activities"

    id = Column(Integer, primary_key=True, index=True)
    program_week = Column(Integer, nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text)
    type = Column(String(50))  # education, exercise, assessment, etc.
    duration = Column(String(50))  # approximate time to complete
    order = Column(Integer)  # ordering within the week

    def __repr__(self):
        return f"<Activity {self.title} (Week {self.program_week})>"


class ProgramProgress(Base, TimestampMixin):
    """Model for tracking user progress through the CBT-I program."""

    __tablename__ = "program_progress"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    activity_id = Column(Integer, ForeignKey("activities.id"), nullable=False)
    completed = Column(Boolean, default=False)
    completed_at = Column(DateTime)
    notes = Column(Text)

    # Relationships
    user = relationship("User", back_populates="program_progress")
    activity = relationship("Activity")

    def __repr__(self):
        return f"<ProgramProgress User:{self.user_id} Activity:{self.activity_id} Completed:{self.completed}>"
