# app/core/config.py
from pydantic_settings import BaseSettings
from typing import List, Optional
import secrets
from pydantic import AnyHttpUrl


class Settings(BaseSettings):
    """
    Application configuration settings loaded from environment variables.
    """

    API_PREFIX: str = "/api"
    PROJECT_NAME: str = "CBT-I Sleep Application"
    DEBUG: bool = False
    SECRET_KEY: str = secrets.token_urlsafe(32)
    DATABASE_URL: str = "sqlite:///./cbt_sleep_app.db"
    CORS_ORIGINS: List[AnyHttpUrl] = ["http://localhost:3000"]  # Frontend URL

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
