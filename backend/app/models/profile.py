import uuid
from datetime import datetime
from decimal import Decimal

from sqlalchemy import (
    Boolean,
    CheckConstraint,
    DateTime,
    ForeignKey,
    Integer,
    Numeric,
    String,
    Text,
    Uuid,
    func,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.database import Base


class UserProfile(Base):
    __tablename__ = "user_profiles"

    __table_args__ = (
        CheckConstraint(
            "age IS NULL OR age BETWEEN 14 AND 100",
            name="ck_user_profiles_age_range",
        ),
        CheckConstraint(
            "height_cm IS NULL OR height_cm BETWEEN 100 AND 250",
            name="ck_user_profiles_height_range",
        ),
        CheckConstraint(
            "weight_kg IS NULL OR weight_kg BETWEEN 20 AND 300",
            name="ck_user_profiles_weight_range",
        ),
    )

    id: Mapped[uuid.UUID] = mapped_column(
        Uuid(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )

    user_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"),
        unique=True,
        nullable=False,
    )

    gender: Mapped[str | None] = mapped_column(String(30))
    age: Mapped[int | None] = mapped_column(Integer)
    height_cm: Mapped[Decimal | None] = mapped_column(Numeric(5, 2))
    weight_kg: Mapped[Decimal | None] = mapped_column(Numeric(5, 2))

    activity_level: Mapped[str | None] = mapped_column(String(30))

    restrictions_confirmed: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        nullable=False,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

    user: Mapped["User"] = relationship(back_populates="profile")


class NutritionTargets(Base):
    __tablename__ = "nutrition_targets"

    __table_args__ = (
        CheckConstraint(
            "calories IS NULL OR calories > 0",
            name="ck_nutrition_targets_calories_positive",
        ),
        CheckConstraint(
            "proteins IS NULL OR proteins >= 0",
            name="ck_nutrition_targets_proteins_nonnegative",
        ),
        CheckConstraint(
            "fats IS NULL OR fats >= 0",
            name="ck_nutrition_targets_fats_nonnegative",
        ),
        CheckConstraint(
            "carbs IS NULL OR carbs >= 0",
            name="ck_nutrition_targets_carbs_nonnegative",
        ),
    )

    id: Mapped[uuid.UUID] = mapped_column(
        Uuid(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )

    user_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"),
        unique=True,
        nullable=False,
    )

    goal: Mapped[str | None] = mapped_column(String(30))

    calories: Mapped[int | None] = mapped_column(Integer)
    proteins: Mapped[Decimal | None] = mapped_column(Numeric(7, 2))
    fats: Mapped[Decimal | None] = mapped_column(Numeric(7, 2))
    carbs: Mapped[Decimal | None] = mapped_column(Numeric(7, 2))

    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

    user: Mapped["User"] = relationship(
        back_populates="nutrition_targets"
    )


class DietaryRestriction(Base):
    __tablename__ = "dietary_restrictions"

    __table_args__ = (
        CheckConstraint(
            "restriction_type IN ('allergy', 'intolerance', 'excluded')",
            name="ck_dietary_restrictions_type",
        ),
    )

    id: Mapped[uuid.UUID] = mapped_column(
        Uuid(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )

    user_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    restriction_type: Mapped[str] = mapped_column(
        String(30),
        nullable=False,
    )

    name: Mapped[str] = mapped_column(
        String(150),
        nullable=False,
    )

    user: Mapped["User"] = relationship(
        back_populates="dietary_restrictions"
    )


class FoodPreference(Base):
    __tablename__ = "food_preferences"

    id: Mapped[uuid.UUID] = mapped_column(
        Uuid(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )

    user_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    preference_type: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
    )

    value: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    user: Mapped["User"] = relationship(
        back_populates="food_preferences"
    )