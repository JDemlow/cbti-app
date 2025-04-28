# app/api/routes/users.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.core.database import get_db
from app.models.user import User
from app.schemas.user import UserCreate, UserResponse

router = APIRouter()


@router.post(
    "/",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Create a new user",
)
def create_user(user_data: UserCreate, db: Session = Depends(get_db)):
    """
    Create a new user in the system.

    This endpoint registers a new user with the provided information.

    Parameters:
    - **user_data**: Required user information including email, password, and name

    Returns:
    - User profile information (without password)

    Raises:
    - HTTPException 400: Email already registered
    """
    # Check if user with this email already exists
    db_user = db.query(User).filter(User.email == user_data.email).first()
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered"
        )

    # Implementation would create and return a new user
    # This is a placeholder for demonstration
    return {"id": 1, "email": user_data.email, "first_name": user_data.first_name}
