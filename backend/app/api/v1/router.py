from fastapi import APIRouter

from app.api.v1.endpoints import (
    auth,
    users,
    nutrition,
    restrictions,
    preferences,
)


api_router = APIRouter()

api_router.include_router(auth.router)
api_router.include_router(users.router)
api_router.include_router(nutrition.router)
api_router.include_router(restrictions.router)
api_router.include_router(preferences.router)