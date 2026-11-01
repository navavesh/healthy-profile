from fastapi import FastAPI
from sqlalchemy import text

from app.db.database import engine

app = FastAPI(
    title="Healthy Profile API",
    description="Backend сервиса «Здоровый Профиль»",
    version="1.0.0",
)


@app.get("/")
async def root():
    return {"message": "Healthy Profile API is running!"}


@app.get("/health")
async def health_check():
    try:
        async with engine.connect() as connection:
            await connection.execute(text("SELECT 1"))

        return {
            "status": "ok",
            "database": "connected",
        }

    except Exception as error:
        return {
            "status": "error",
            "database": "disconnected",
            "detail": str(error),
        } 