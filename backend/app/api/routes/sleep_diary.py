# backend/app/api/routes/sleep_diary.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime, timedelta

from backend.app.core.database import get_db
from backend.app.schemas.sleep_diary import (
    SleepDiaryCreate,
    SleepDiaryResponse,
    SleepDiaryUpdate,
    SleepDiaryList,
)
from backend.app.models.sleep_diary import SleepDiary

router = APIRouter()


@router.post(
    "/{user_id}",
    response_model=SleepDiaryResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Create a new sleep diary entry",
)
def create_sleep_diary(
    user_id: int, diary_data: SleepDiaryCreate, db: Session = Depends(get_db)
):
    """
    Create a new sleep diary entry for a user.

    Parameters:
    - **user_id**: The ID of the user this entry belongs to
    - **diary_data**: Sleep diary entry details

    Returns:
    - Created sleep diary entry with calculated metrics

    Raises:
    - HTTPException 400: Entry already exists for this date
    """
    # Check if an entry already exists for this date
    existing_entry = (
        db.query(SleepDiary)
        .filter(SleepDiary.user_id == user_id, SleepDiary.date == diary_data.date)
        .first()
    )

    if existing_entry:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A sleep diary entry already exists for this date",
        )

    # Calculate derived fields
    # Convert times to minutes for calculations
    def time_to_minutes(t):
        return t.hour * 60 + t.minute

    bed_time_mins = time_to_minutes(diary_data.bed_time)
    get_up_time_mins = time_to_minutes(diary_data.get_up_time)
    fall_asleep_time_mins = time_to_minutes(diary_data.fall_asleep_time)
    wake_time_mins = time_to_minutes(diary_data.wake_time)

    # Adjust for crossing midnight
    if get_up_time_mins < bed_time_mins:
        get_up_time_mins += 24 * 60  # Add a day's worth of minutes

    if wake_time_mins < fall_asleep_time_mins:
        wake_time_mins += 24 * 60

    # Calculate time in bed (in minutes)
    time_in_bed = get_up_time_mins - bed_time_mins

    # Calculate total sleep time (in minutes)
    total_sleep_time = (
        wake_time_mins - fall_asleep_time_mins - diary_data.total_awake_time
    )

    # Calculate sleep efficiency
    sleep_efficiency = (total_sleep_time / time_in_bed) * 100 if time_in_bed > 0 else 0

    # Create sleep diary entry
    db_diary = SleepDiary(
        user_id=user_id,
        date=diary_data.date,
        bed_time=diary_data.bed_time,
        fall_asleep_time=diary_data.fall_asleep_time,
        wake_time=diary_data.wake_time,
        get_up_time=diary_data.get_up_time,
        awakenings=diary_data.awakenings,
        total_awake_time=diary_data.total_awake_time,
        sleep_quality=diary_data.sleep_quality,
        restedness=diary_data.restedness,
        mood=diary_data.mood,
        notes=diary_data.notes,
        time_in_bed=time_in_bed,
        total_sleep_time=total_sleep_time,
        sleep_efficiency=sleep_efficiency,
    )

    db.add(db_diary)
    db.commit()
    db.refresh(db_diary)

    return db_diary


@router.get(
    "/{user_id}",
    response_model=SleepDiaryList,
    summary="Get all sleep diary entries for a user",
)
def get_sleep_diaries(
    user_id: int, limit: int = 30, skip: int = 0, db: Session = Depends(get_db)
):
    """
    Retrieve sleep diary entries for a specific user.

    Parameters:
    - **user_id**: The ID of the user
    - **limit**: Maximum number of entries to return (default: 30)
    - **skip**: Number of entries to skip (for pagination)

    Returns:
    - List of sleep diary entries
    """
    diaries = (
        db.query(SleepDiary)
        .filter(SleepDiary.user_id == user_id)
        .order_by(SleepDiary.date.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )

    return {"diaries": diaries}


@router.get(
    "/{user_id}/{diary_id}",
    response_model=SleepDiaryResponse,
    summary="Get a specific sleep diary entry",
)
def get_sleep_diary(user_id: int, diary_id: int, db: Session = Depends(get_db)):
    """
    Retrieve a specific sleep diary entry.

    Parameters:
    - **user_id**: The ID of the user
    - **diary_id**: The ID of the sleep diary entry

    Returns:
    - Sleep diary entry details

    Raises:
    - HTTPException 404: Entry not found
    """
    diary = (
        db.query(SleepDiary)
        .filter(SleepDiary.id == diary_id, SleepDiary.user_id == user_id)
        .first()
    )

    if not diary:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Sleep diary entry not found"
        )

    return diary


@router.put(
    "/{user_id}/{diary_id}",
    response_model=SleepDiaryResponse,
    summary="Update a sleep diary entry",
)
def update_sleep_diary(
    user_id: int,
    diary_id: int,
    diary_data: SleepDiaryUpdate,
    db: Session = Depends(get_db),
):
    """
    Update a specific sleep diary entry.

    Parameters:
    - **user_id**: The ID of the user
    - **diary_id**: The ID of the sleep diary entry to update
    - **diary_data**: New sleep diary data

    Returns:
    - Updated sleep diary entry

    Raises:
    - HTTPException 404: Entry not found
    """
    diary = (
        db.query(SleepDiary)
        .filter(SleepDiary.id == diary_id, SleepDiary.user_id == user_id)
        .first()
    )

    if not diary:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Sleep diary entry not found"
        )

    # Update diary entry for any provided fields
    update_data = diary_data.dict(exclude_unset=True)
    if update_data:
        for key, value in update_data.items():
            setattr(diary, key, value)

        # Recalculate derived fields if times have been updated
        time_fields = {
            "bed_time",
            "get_up_time",
            "fall_asleep_time",
            "wake_time",
            "total_awake_time",
        }
        if any(field in update_data for field in time_fields):

            def time_to_minutes(t):
                return t.hour * 60 + t.minute

            bed_time_mins = time_to_minutes(diary.bed_time)
            get_up_time_mins = time_to_minutes(diary.get_up_time)
            fall_asleep_time_mins = time_to_minutes(diary.fall_asleep_time)
            wake_time_mins = time_to_minutes(diary.wake_time)

            # Adjust for crossing midnight
            if get_up_time_mins < bed_time_mins:
                get_up_time_mins += 24 * 60

            if wake_time_mins < fall_asleep_time_mins:
                wake_time_mins += 24 * 60

            diary.time_in_bed = get_up_time_mins - bed_time_mins
            diary.total_sleep_time = (
                wake_time_mins - fall_asleep_time_mins - diary.total_awake_time
            )
            diary.sleep_efficiency = (
                (diary.total_sleep_time / diary.time_in_bed) * 100
                if diary.time_in_bed > 0
                else 0
            )

    db.commit()
    db.refresh(diary)

    return diary


@router.delete(
    "/{user_id}/{diary_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Delete a sleep diary entry",
)
def delete_sleep_diary(user_id: int, diary_id: int, db: Session = Depends(get_db)):
    """
    Delete a specific sleep diary entry.

    Parameters:
    - **user_id**: The ID of the user
    - **diary_id**: The ID of the sleep diary entry to delete

    Returns:
    - No content on successful deletion

    Raises:
    - HTTPException 404: Entry not found
    """
    diary = (
        db.query(SleepDiary)
        .filter(SleepDiary.id == diary_id, SleepDiary.user_id == user_id)
        .first()
    )

    if not diary:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Sleep diary entry not found"
        )

    db.delete(diary)
    db.commit()

    return None
