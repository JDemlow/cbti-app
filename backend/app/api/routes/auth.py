from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from passlib.context import CryptContext

from backend.app.core.database import get_db
from backend.app.models.user import User
from backend.app.schemas.user import UserResponse
from backend.app.core.security import create_access_token

router = APIRouter()

import warnings

warnings.filterwarnings("ignore", category=DeprecationWarning)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


@router.post("/login", response_model=dict)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)
):
    # Optional: Add some logging or print statements for debugging
    print(f"Login attempt for username: {form_data.username}")

    # Find user by email
    user = db.query(User).filter(User.email == form_data.username).first()

    # Optional: Add more detailed logging
    if not user:
        print(f"No user found with email: {form_data.username}")

    # Verify user exists and password is correct
    if not user or not pwd_context.verify(form_data.password, user.hashed_password):
        print("Login failed: Incorrect username or password")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Create access token
    access_token = create_access_token(data={"sub": str(user.id)})

    # Convert user to response model
    user_response = UserResponse.model_validate(user)

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": user_response.model_dump(),
    }
