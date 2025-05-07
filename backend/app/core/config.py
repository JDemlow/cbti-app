# backend/app/core/config.py
from pydantic_settings import BaseSettings
from typing import List, Union
import secrets
from pydantic import field_validator


class Settings(BaseSettings):
    API_PREFIX: str = "/api"
    PROJECT_NAME: str = "CBT-I Sleep Application"
    DEBUG: bool = True
    SECRET_KEY: str = secrets.token_urlsafe(32)

    # 60 minutes * 24 hours * 7 days = 7 days in minutes
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7

    # CORS settings
    CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://cbti-app.vercel.app/",
    ]

    @field_validator("CORS_ORIGINS", mode="before")
    @classmethod
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> List[str]:
        if isinstance(v, str):
            return [i.strip() for i in v.split(",")]
        return list(v)

    # Database settings
    DATABASE_URL: str = "sqlite:///./cbt_sleep_app.db"

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
