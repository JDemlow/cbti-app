# app/api/routes/__init__.py
from fastapi import APIRouter
from app.api.routes import users, sleep_diary, program

router = APIRouter()

# Include routers for different API sections
router.include_router(users.router, prefix="/users", tags=["Users"])
router.include_router(sleep_diary.router, prefix="/sleep-diary", tags=["Sleep Diary"])
router.include_router(program.router, prefix="/program", tags=["Program"])
