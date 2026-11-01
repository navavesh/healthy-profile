from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.dependencies import get_current_user
from app.db.database import get_db
from app.models import FoodPreference, User
from app.schemas.preference import (
    PreferenceCreate,
    PreferenceResponse,
    PreferenceUpdate,
)


router = APIRouter(prefix="/preferences", tags=["Preferences"])


@router.get("", response_model=list[PreferenceResponse])
async def get_preferences(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(FoodPreference)
        .where(FoodPreference.user_id == current_user.id)
        .order_by(FoodPreference.preference_type)
    )

    return result.scalars().all()


@router.post(
    "",
    response_model=PreferenceResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_preference(
    data: PreferenceCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    preference = FoodPreference(
        user_id=current_user.id,
        **data.model_dump(),
    )

    db.add(preference)
    await db.commit()
    await db.refresh(preference)

    return preference


@router.patch("/{preference_id}", response_model=PreferenceResponse)
async def update_preference(
    preference_id: UUID,
    data: PreferenceUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(FoodPreference).where(
            FoodPreference.id == preference_id,
            FoodPreference.user_id == current_user.id,
        )
    )

    preference = result.scalar_one_or_none()

    if preference is None:
        raise HTTPException(
            status_code=404,
            detail={
                "code": "PREFERENCE_NOT_FOUND",
                "message": "Предпочтение не найдено",
            },
        )

    update_data = data.model_dump(exclude_unset=True)

    for field, value in update_data.items():
        if value is None:
            raise HTTPException(
                status_code=422,
                detail=f"{field} не может быть null",
            )

        if isinstance(value, str):
            value = value.strip()

            if not value:
                raise HTTPException(
                    status_code=422,
                    detail=f"{field} не может быть пустым",
                )

        setattr(preference, field, value)

    await db.commit()
    await db.refresh(preference)

    return preference


@router.delete(
    "/{preference_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
async def delete_preference(
    preference_id: UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(FoodPreference).where(
            FoodPreference.id == preference_id,
            FoodPreference.user_id == current_user.id,
        )
    )

    preference = result.scalar_one_or_none()

    if preference is None:
        raise HTTPException(
            status_code=404,
            detail={
                "code": "PREFERENCE_NOT_FOUND",
                "message": "Предпочтение не найдено",
            },
        )

    await db.delete(preference)
    await db.commit()

    return Response(status_code=status.HTTP_204_NO_CONTENT)