# backend/app/api/routes/users.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from backend.app.core.database import get_db
from backend.app.schemas.user import UserCreate, UserResponse, UserUpdate
from backend.app.models.user import User
from passlib.context import CryptContext

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


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

    # Create new user with hashed password
    hashed_password = pwd_context.hash(user_data.password)
    db_user = User(
        email=user_data.email,
        hashed_password=hashed_password,
        first_name=user_data.first_name,
        last_name=user_data.last_name,
        phone_number=user_data.phone_number,
        time_zone=user_data.time_zone,
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user


@router.get("/{user_id}", response_model=UserResponse, summary="Get user by ID")
def get_user(user_id: int, db: Session = Depends(get_db)):
    """
    Retrieve a specific user by ID.

    Parameters:
    - **user_id**: The ID of the user to retrieve

    Returns:
    - User profile information

    Raises:
    - HTTPException 404: User not found
    """
    db_user = db.query(User).filter(User.id == user_id).first()
    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
        )
    return db_user


@router.put(
    "/{user_id}", response_model=UserResponse, summary="Update user information"
)
def update_user(user_id: int, user_data: UserUpdate, db: Session = Depends(get_db)):
    """
    Update a user's information.

    Parameters:
    - **user_id**: The ID of the user to update
    - **user_data**: The new user data

    Returns:
    - Updated user profile information

    Raises:
    - HTTPException 404: User not found
    """
    db_user = db.query(User).filter(User.id == user_id).first()
    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
        )

    # Update user data for any provided fields
    update_data = user_data.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_user, key, value)

    db.commit()
    db.refresh(db_user)

    return db_user


@router.delete(
    "/{user_id}", status_code=status.HTTP_204_NO_CONTENT, summary="Delete user"
)
def delete_user(user_id: int, db: Session = Depends(get_db)):
    """
    Delete a user from the system.

    Parameters:
    - **user_id**: The ID of the user to delete

    Returns:
    - No content on successful deletion

    Raises:
    - HTTPException 404: User not found
    """
    db_user = db.query(User).filter(User.id == user_id).first()
    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
        )

    db.delete(db_user)
    db.commit()

    return None
