from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.dependencies import get_current_user
from app.db.database import get_db
from app.models import User, UserProfile
from app.schemas.user import UserMeResponse, UserProfileUpdate


router = APIRouter(prefix="/users", tags=["Users"])


async def get_or_create_profile(
    db: AsyncSession,
    user: User,
) -> UserProfile:
    result = await db.execute(
        select(UserProfile).where(
            UserProfile.user_id == user.id
        )
    )

    profile = result.scalar_one_or_none()

    if profile is None:
        profile = UserProfile(user_id=user.id)
        db.add(profile)
        await db.commit()
        await db.refresh(profile)

    return profile


@router.get("/me", response_model=UserMeResponse)
async def get_my_profile(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    profile = await get_or_create_profile(db, current_user)

    return {
        "id": current_user.id,
        "email": current_user.email,
        "created_at": current_user.created_at,
        "profile": profile,
    }


@router.patch("/me", response_model=UserMeResponse)
async def update_my_profile(
    data: UserProfileUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    profile = await get_or_create_profile(db, current_user)

    update_data = data.model_dump(exclude_unset=True)

    for field, value in update_data.items():
        setattr(profile, field, value)

    await db.commit()
    await db.refresh(profile)

    return {
        "id": current_user.id,
        "email": current_user.email,
        "created_at": current_user.created_at,
        "profile": profile,
    }