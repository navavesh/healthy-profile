from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.dependencies import get_current_user
from app.db.database import get_db
from app.models import NutritionTargets, User
from app.schemas.nutrition import (
    NutritionTargetsResponse,
    NutritionTargetsUpdate,
)


router = APIRouter(prefix="/nutrition", tags=["Nutrition"])


@router.get(
    "/targets",
    response_model=NutritionTargetsResponse | None,
)
async def get_targets(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(NutritionTargets).where(
            NutritionTargets.user_id == current_user.id
        )
    )

    return result.scalar_one_or_none()


@router.put(
    "/targets",
    response_model=NutritionTargetsResponse,
)
async def update_targets(
    data: NutritionTargetsUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(NutritionTargets).where(
            NutritionTargets.user_id == current_user.id
        )
    )

    targets = result.scalar_one_or_none()

    values = data.model_dump()

    if targets is None:
        targets = NutritionTargets(
            user_id=current_user.id,
            **values,
        )
        db.add(targets)
    else:
        for field, value in values.items():
            setattr(targets, field, value)

    try:
        await db.commit()
        await db.refresh(targets)
    except Exception:
        await db.rollback()
        raise

    return targets