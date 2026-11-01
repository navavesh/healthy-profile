from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException, status
from fastapi.exceptions import RequestValidationError
from sqlalchemy import text

from app.api.v1.router import api_router
from app.core.config import settings
from app.core.exceptions import validation_exception_handler
from app.db.database import engine


@asynccontextmanager
async def lifespan(app: FastAPI):
    yield
    await engine.dispose()


app = FastAPI(
    title="Healthy Profile API",
    description="Backend сервиса «Здоровый Профиль»",
    version="1.0.0",
    debug=settings.DEBUG,
    lifespan=lifespan,
)

app.add_exception_handler(
    RequestValidationError,
    validation_exception_handler,
)

app.include_router(
    api_router,
    prefix="/api/v1",
)


@app.get("/")
async def root():
    return {
        "message": "Healthy Profile API is running!"
    }


@app.get("/health")
async def health_check():
    try:
        async with engine.connect() as connection:
            await connection.execute(text("SELECT 1"))

        return {
            "status": "ok",
            "database": "connected",
        }

    except Exception:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail={
                "code": "DATABASE_UNAVAILABLE",
                "message": "Database connection failed",
            },
        )