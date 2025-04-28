# backend/app/schemas/sleep_diary.py
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import date, time


class SleepDiaryBase(BaseModel):
    date: date
    bed_time: time
    fall_asleep_time: time
    wake_time: time
    get_up_time: time
    awakenings: int = 0
    total_awake_time: int = 0
    sleep_quality: int = Field(..., ge=1, le=5)
    restedness: int = Field(..., ge=1, le=5)
    mood: int = Field(..., ge=1, le=5)
    notes: Optional[str] = None


class SleepDiaryCreate(SleepDiaryBase):
    pass


class SleepDiaryUpdate(BaseModel):
    bed_time: Optional[time] = None
    fall_asleep_time: Optional[time] = None
    wake_time: Optional[time] = None
    get_up_time: Optional[time] = None
    awakenings: Optional[int] = None
    total_awake_time: Optional[int] = None
    sleep_quality: Optional[int] = Field(None, ge=1, le=5)
    restedness: Optional[int] = Field(None, ge=1, le=5)
    mood: Optional[int] = Field(None, ge=1, le=5)
    notes: Optional[str] = None


class SleepDiaryInDB(SleepDiaryBase):
    id: int
    user_id: int
    time_in_bed: int
    total_sleep_time: int
    sleep_efficiency: float

    class Config:
        orm_mode = True


class SleepDiaryResponse(SleepDiaryInDB):
    pass


class SleepDiaryList(BaseModel):
    diaries: List[SleepDiaryResponse]
