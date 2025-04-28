# backend/app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="CBT-I Sleep Application",
    description="""
    CBT-I Sleep Application API.
    This API provides endpoints for tracking sleep patterns, managing a 12-week CBT-I program,
    and delivering personalized sleep recommendations based on user data.
    """,
    version="0.1.0",
)

# Add CORS middleware to allow requests from your frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Your Next.js frontend URL
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
