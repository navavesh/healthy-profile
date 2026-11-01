import jwt

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.dependencies import get_current_user
from app.core.security import decode_token
from app.db.database import get_db
from app.models import User
from app.schemas.auth import (
    MessageResponse,
    RefreshRequest,
    TokenResponse,
    UserLogin,
    UserRegister,
    UserResponse,
)
from app.services.auth_service import (
    authenticate_user,
    issue_tokens,
    refresh_tokens,
    register_user,
    revoke_refresh_token,
)


router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post(
    "/register",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
)
async def register(
    data: UserRegister,
    db: AsyncSession = Depends(get_db),
):
    return await register_user(db, data)


@router.post(
    "/login",
    response_model=TokenResponse,
)
async def login(
    data: UserLogin,
    db: AsyncSession = Depends(get_db),
):
    user = await authenticate_user(
        db,
        data.email,
        data.password,
    )

    return await issue_tokens(db, user)


@router.post(
    "/refresh",
    response_model=TokenResponse,
)
async def refresh(
    data: RefreshRequest,
    db: AsyncSession = Depends(get_db),
):
    try:
        payload = decode_token(data.refresh_token)

        if payload.get("type") != "refresh":
            raise ValueError("Wrong token type")

    except (jwt.InvalidTokenError, ValueError):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={
                "code": "INVALID_REFRESH_TOKEN",
                "message": "Недействительный или просроченный refresh-токен",
            },
        )

    return await refresh_tokens(
        db,
        data.refresh_token,
        payload,
    )


@router.post(
    "/logout",
    response_model=MessageResponse,
)
async def logout(
    data: RefreshRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    try:
        payload = decode_token(data.refresh_token)

        if payload.get("type") != "refresh":
            raise ValueError("Wrong token type")

        if payload.get("sub") != str(current_user.id):
            raise ValueError("Wrong token owner")

    except (jwt.InvalidTokenError, ValueError):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={
                "code": "INVALID_REFRESH_TOKEN",
                "message": "Недействительный refresh-токен",
            },
        )

    await revoke_refresh_token(
        db,
        data.refresh_token,
        payload,
    )

    return {"message": "Выход выполнен"}