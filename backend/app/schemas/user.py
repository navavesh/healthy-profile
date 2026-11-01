from datetime import datetime
from decimal import Decimal
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class UserProfileUpdate(BaseModel):
    gender: str | None = Field(default=None, max_length=30)
    age: int | None = Field(default=None, ge=14, le=100)
    height_cm: Decimal | None = Field(default=None, ge=100, le=250)
    weight_kg: Decimal | None = Field(default=None, ge=20, le=300)
    activity_level: str | None = Field(default=None, max_length=30)
    restrictions_confirmed: bool | None = None


class UserProfileResponse(BaseModel):
    id: UUID
    gender: str | None
    age: int | None
    height_cm: Decimal | None
    weight_kg: Decimal | None
    activity_level: str | None
    restrictions_confirmed: bool
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class UserMeResponse(BaseModel):
    id: UUID
    email: str
    created_at: datetime
    profile: UserProfileResponse

    model_config = ConfigDict(from_attributes=True)