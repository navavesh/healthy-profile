from datetime import datetime
from decimal import Decimal
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class NutritionTargetsUpdate(BaseModel):
    goal: str | None = Field(default=None, max_length=30)

    calories: int | None = Field(default=None, gt=0)
    proteins: Decimal | None = Field(default=None, ge=0)
    fats: Decimal | None = Field(default=None, ge=0)
    carbs: Decimal | None = Field(default=None, ge=0)


class NutritionTargetsResponse(BaseModel):
    id: UUID
    goal: str | None
    calories: int | None
    proteins: Decimal | None
    fats: Decimal | None
    carbs: Decimal | None
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)