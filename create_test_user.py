# create_test_user.py
import sys
import os

sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))

from backend.app.core.database import SessionLocal
from backend.app.models.user import User
from passlib.context import CryptContext


def delete_and_create_test_user():
    # Create a password context
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

    # Create a database session
    db = SessionLocal()

    try:
        # Find and delete existing user
        existing_user = db.query(User).filter(User.email == "test@example.com").first()

        if existing_user:
            print(f"Deleting existing user with ID: {existing_user.id}")
            db.delete(existing_user)
            db.commit()

        # Create new user
        test_user = User(
            email="test@example.com",
            hashed_password=pwd_context.hash("StrongTestPassword123!"),
            first_name="Test",
            last_name="User",
            is_active=True,
            week_in_program=1,
        )
        db.add(test_user)
        db.commit()
        db.refresh(test_user)

        print(f"Created new user with ID: {test_user.id}, Email: {test_user.email}")
        print("Login Credentials:")
        print(f"Email: {test_user.email}")
        print("Password: StrongTestPassword123!")

    except Exception as e:
        print(f"An error occurred: {e}")
        db.rollback()

    finally:
        # Close the session
        db.close()


if __name__ == "__main__":
    delete_and_create_test_user()
