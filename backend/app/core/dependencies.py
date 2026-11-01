from uuid import UUID

import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security import decode_token
from app.db.database import get_db
from app.models import User


oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/api/v1/auth/login",
)


async def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(get_db),
) -> User:

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail={
            "code": "INVALID_CREDENTIALS",
            "message": "Недействительный или просроченный токен",
        },
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = decode_token(token)

        if payload.get("type") != "access":
            raise credentials_exception

        user_id = UUID(payload.get("sub"))

    except (jwt.InvalidTokenError, ValueError, TypeError):
        raise credentials_exception

    result = await db.execute(
        select(User).where(User.id == user_id)
    )

    user = result.scalar_one_or_none()

    if user is None:
        raise credentials_exception

    return user