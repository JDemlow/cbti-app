# backend/app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from backend.app.core.config import settings
from backend.app.core.database import create_db_and_tables


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Lifespan event handler for application startup and shutdown.
    Creates database tables on startup.
    """
    # Create database tables on startup
    create_db_and_tables()
    yield
    # Cleanup resources on shutdown if needed


app = FastAPI(
    title=settings.PROJECT_NAME,
    description="""
    CBT-I Sleep Application API.
    This API provides endpoints for tracking sleep patterns, managing a 12-week CBT-I program,
    and delivering personalized sleep recommendations based on user data.
    """,
    version="0.1.0",
    lifespan=lifespan,
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    """
    Root endpoint to verify the API is running.

    Returns:
        dict: A welcome message and API status
    """
    return {"message": "Welcome to the CBT-I Sleep Application API", "status": "online"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
