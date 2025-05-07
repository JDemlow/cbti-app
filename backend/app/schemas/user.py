# backend/app/schemas/user.py
from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List


class UserBase(BaseModel):
    email: EmailStr
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    phone_number: Optional[str] = None
    time_zone: Optional[str] = "America/New_York"

    # New onboarding fields
    bedtime: Optional[str] = None
    wake_time: Optional[str] = None
    insomnia_duration: Optional[str] = None
    sleep_issues: Optional[List[str]] = None
    sleep_goals: Optional[List[str]] = None


class UserCreate(UserBase):
    password: str = Field(..., min_length=8)


class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    phone_number: Optional[str] = None
    time_zone: Optional[str] = None

    # New onboarding fields for update
    bedtime: Optional[str] = None
    wake_time: Optional[str] = None
    insomnia_duration: Optional[str] = None
    sleep_issues: Optional[List[str]] = None
    sleep_goals: Optional[List[str]] = None


class UserInDB(UserBase):
    id: int
    is_active: bool
    week_in_program: int

    class Config:
        from_attributes = True  # Replace orm_mode in Pydantic V2


class UserResponse(UserInDB):
    pass
