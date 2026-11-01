from datetime import datetime, timezone
from uuid import UUID, uuid4

from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security import (
    create_access_token,
    create_refresh_token,
    hash_password,
    hash_token,
    verify_password,
)
from app.models import RefreshToken, User
from app.schemas.auth import UserRegister


def auth_error(
    code: str,
    message: str,
    status_code: int = status.HTTP_401_UNAUTHORIZED,
) -> HTTPException:
    return HTTPException(
        status_code=status_code,
        detail={
            "code": code,
            "message": message,
        },
    )


async def register_user(
    db: AsyncSession,
    data: UserRegister,
) -> User:
    email = str(data.email).strip().lower()

    result = await db.execute(
        select(User).where(User.email == email)
    )

    if result.scalar_one_or_none():
        raise auth_error(
            "EMAIL_ALREADY_REGISTERED",
            "Пользователь с таким email уже существует",
            status.HTTP_409_CONFLICT,
        )

    user = User(
        email=email,
        password_hash=hash_password(data.password),
    )

    db.add(user)

    try:
        await db.commit()
        await db.refresh(user)
    except Exception:
        await db.rollback()
        raise

    return user


async def authenticate_user(
    db: AsyncSession,
    email: str,
    password: str,
) -> User:
    normalized_email = email.strip().lower()

    result = await db.execute(
        select(User).where(User.email == normalized_email)
    )

    user = result.scalar_one_or_none()

    if user is None or not verify_password(
        password,
        user.password_hash,
    ):
        raise auth_error(
            "INVALID_EMAIL_OR_PASSWORD",
            "Неверный email или пароль",
        )

    return user


async def issue_tokens(
    db: AsyncSession,
    user: User,
) -> dict:
    jti = uuid4()

    access_token = create_access_token(user.id)
    refresh_token, expires_at = create_refresh_token(
        user.id,
        jti,
    )

    db.add(
        RefreshToken(
            user_id=user.id,
            jti=jti,
            token_hash=hash_token(refresh_token),
            expires_at=expires_at,
        )
    )

    await db.commit()

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
    }


async def refresh_tokens(
    db: AsyncSession,
    token: str,
    payload: dict,
) -> dict:
    try:
        user_id = UUID(payload["sub"])
        jti = UUID(payload["jti"])
    except (KeyError, ValueError, TypeError):
        raise auth_error(
            "INVALID_REFRESH_TOKEN",
            "Недействительный refresh-токен",
        )

    result = await db.execute(
        select(RefreshToken)
        .where(RefreshToken.jti == jti)
        .with_for_update()
    )

    stored_token = result.scalar_one_or_none()

    if stored_token is None:
        raise auth_error(
            "INVALID_REFRESH_TOKEN",
            "Refresh-токен не найден",
        )

    if stored_token.revoked_at is not None:
        # Повторное использование отозванного токена.
        # Отзываем все активные сессии пользователя.
        await db.execute(
            select(RefreshToken)
            .where(
                RefreshToken.user_id == stored_token.user_id,
                RefreshToken.revoked_at.is_(None),
            )
            .with_for_update()
        )

        now = datetime.now(timezone.utc)

        active_result = await db.execute(
            select(RefreshToken).where(
                RefreshToken.user_id == stored_token.user_id,
                RefreshToken.revoked_at.is_(None),
            )
        )

        for active_token in active_result.scalars():
            active_token.revoked_at = now

        await db.commit()

        raise auth_error(
            "REFRESH_TOKEN_REUSED",
            "Обнаружено повторное использование токена. "
            "Войдите в аккаунт заново.",
        )

    if (
        stored_token.user_id != user_id
        or stored_token.token_hash != hash_token(token)
        or stored_token.expires_at <= datetime.now(timezone.utc)
    ):
        raise auth_error(
            "INVALID_REFRESH_TOKEN",
            "Недействительный или просроченный refresh-токен",
        )

    user_result = await db.execute(
        select(User).where(User.id == user_id)
    )
    user = user_result.scalar_one_or_none()

    if user is None:
        raise auth_error(
            "USER_NOT_FOUND",
            "Пользователь не найден",
        )

    stored_token.revoked_at = datetime.now(timezone.utc)

    return await issue_tokens(db, user)


async def revoke_refresh_token(
    db: AsyncSession,
    token: str,
    payload: dict,
) -> None:
    try:
        jti = UUID(payload["jti"])
        user_id = UUID(payload["sub"])
    except (KeyError, ValueError, TypeError):
        raise auth_error(
            "INVALID_REFRESH_TOKEN",
            "Недействительный refresh-токен",
        )

    result = await db.execute(
        select(RefreshToken).where(
            RefreshToken.jti == jti,
            RefreshToken.user_id == user_id,
        )
    )

    stored_token = result.scalar_one_or_none()

    if (
        stored_token is None
        or stored_token.revoked_at is not None
        or stored_token.token_hash != hash_token(token)
    ):
        raise auth_error(
            "INVALID_REFRESH_TOKEN",
            "Refresh-токен уже отозван или недействителен",
        )

    stored_token.revoked_at = datetime.now(timezone.utc)
    await db.commit()