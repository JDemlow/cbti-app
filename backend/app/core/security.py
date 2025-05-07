from datetime import datetime, timedelta, timezone
from typing import Optional
import jwt

from backend.app.core.config import settings


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()

    # Use timezone.utc instead of datetime.UTC
    now = datetime.now(timezone.utc)

    if expires_delta:
        expire = now + expires_delta
    else:
        expire = now + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)

    # Convert to timestamp for JWT encoding
    to_encode.update({"exp": expire.timestamp()})

    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm="HS256")
    return encoded_jwt
