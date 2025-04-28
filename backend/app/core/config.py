# backend/app/core/config.py
from pydantic_settings import BaseSettings
from typing import List, Optional
import secrets
from pydantic import AnyHttpUrl, validator


class Settings(BaseSettings):
    API_PREFIX: str = "/api"
    PROJECT_NAME: str = "CBT-I Sleep Application"
    DEBUG: bool = True
    SECRET_KEY: str = secrets.token_urlsafe(32)

    # 60 minutes * 24 hours * 7 days = 7 days in minutes
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7

    # CORS settings
    CORS_ORIGINS: List[str] = ["http://localhost:3000"]

    # Database settings
    DATABASE_URL: str = "sqlite:///./cbt_sleep_app.db"

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
