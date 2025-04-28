# backend/app/schemas/user.py
from pydantic import BaseModel, EmailStr, Field
from typing import Optional


class UserBase(BaseModel):
    email: EmailStr
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    phone_number: Optional[str] = None
    time_zone: Optional[str] = "America/New_York"


class UserCreate(UserBase):
    password: str = Field(..., min_length=8)


class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    phone_number: Optional[str] = None
    time_zone: Optional[str] = None


class UserInDB(UserBase):
    id: int
    is_active: bool
    week_in_program: int

    class Config:
        orm_mode = True


class UserResponse(UserInDB):
    pass
