# backend/app/core/database.py
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from backend.app.core.config import settings
from backend.app.models.base import Base

# Create database engine
engine = create_engine(
    settings.DATABASE_URL,
    connect_args=(
        {"check_same_thread": False}
        if settings.DATABASE_URL.startswith("sqlite")
        else {}
    ),
)

# Create session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db():
    """
    Dependency for database session management in API endpoints.
    Yields a database session and ensures it's closed after use.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def create_db_and_tables():
    """
    Creates all database tables defined in models.
    Used during application startup.
    """
    # Import all models to ensure they're registered with the Base metadata
    from backend.app.models import (
        user,
        sleep_diary,
        program_progress,
        sleep_goals,
        notification_preferences,
    )

    Base.metadata.create_all(bind=engine)
