from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.dependencies import get_current_user
from app.db.database import get_db
from app.models import DietaryRestriction, User
from app.schemas.restriction import (
    RestrictionCreate,
    RestrictionResponse,
    RestrictionUpdate,
)


router = APIRouter(prefix="/restrictions", tags=["Restrictions"])


@router.get("", response_model=list[RestrictionResponse])
async def get_restrictions(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(DietaryRestriction)
        .where(DietaryRestriction.user_id == current_user.id)
        .order_by(DietaryRestriction.name)
    )

    return result.scalars().all()


@router.post(
    "",
    response_model=RestrictionResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_restriction(
    data: RestrictionCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    restriction = DietaryRestriction(
        user_id=current_user.id,
        **data.model_dump(),
    )

    db.add(restriction)
    await db.commit()
    await db.refresh(restriction)

    return restriction


@router.patch("/{restriction_id}", response_model=RestrictionResponse)
async def update_restriction(
    restriction_id: UUID,
    data: RestrictionUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(DietaryRestriction).where(
            DietaryRestriction.id == restriction_id,
            DietaryRestriction.user_id == current_user.id,
        )
    )

    restriction = result.scalar_one_or_none()

    if restriction is None:
        raise HTTPException(
            status_code=404,
            detail={
                "code": "RESTRICTION_NOT_FOUND",
                "message": "Ограничение не найдено",
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

        setattr(restriction, field, value)

    await db.commit()
    await db.refresh(restriction)

    return restriction


@router.delete(
    "/{restriction_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
async def delete_restriction(
    restriction_id: UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(DietaryRestriction).where(
            DietaryRestriction.id == restriction_id,
            DietaryRestriction.user_id == current_user.id,
        )
    )

    restriction = result.scalar_one_or_none()

    if restriction is None:
        raise HTTPException(
            status_code=404,
            detail={
                "code": "RESTRICTION_NOT_FOUND",
                "message": "Ограничение не найдено",
            },
        )

    await db.delete(restriction)
    await db.commit()

    return Response(status_code=status.HTTP_204_NO_CONTENT)