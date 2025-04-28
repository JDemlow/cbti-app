# backend/app/models/notification_preferences.py
from sqlalchemy import Column, Integer, Boolean, ForeignKey, String
from sqlalchemy.orm import relationship

from backend.app.models.base import Base, TimestampMixin


class NotificationPreferences(Base, TimestampMixin):
    """Model for storing user notification preferences."""

    __tablename__ = "notification_preferences"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, unique=True)

    # Email notifications
    email_reminders = Column(Boolean, default=True)
    weekly_progress_emails = Column(Boolean, default=True)
    tips_and_articles = Column(Boolean, default=False)
    account_alerts = Column(Boolean, default=True)

    # In-app notifications
    sleep_reminders = Column(Boolean, default=True)
    journal_reminders = Column(Boolean, default=True)
    progress_updates = Column(Boolean, default=True)
    achievement_alerts = Column(Boolean, default=True)

    # Reminder frequency
    sleep_reminders_frequency = Column(
        String(20), default="daily"
    )  # daily, weekdays, weekends, never
    journal_reminders_frequency = Column(String(20), default="daily")

    # Reminder times (stored as strings in HH:MM format)
    sleep_reminder_time = Column(String(5), default="21:00")
    morning_reminder_time = Column(String(5), default="08:00")

    def __repr__(self):
        return f"<NotificationPreferences for user {self.user_id}>"
