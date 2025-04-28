# backend/app/api/routes/__init__.py
from fastapi import APIRouter
from backend.app.api.routes import users, sleep_diary

router = APIRouter()

# Include routers for different API sections
router.include_router(users.router, prefix="/users", tags=["Users"])
router.include_router(sleep_diary.router, prefix="/sleep-diary", tags=["Sleep Diary"])
# Commented out until implementation is ready
# router.include_router(program.router, prefix="/program", tags=["Program"])
