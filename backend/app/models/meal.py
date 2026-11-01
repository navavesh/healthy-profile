import uuid
from datetime import datetime
from decimal import Decimal

from sqlalchemy import (
    CheckConstraint,
    DateTime,
    ForeignKey,
    Numeric,
    String,
    Uuid,
    func,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.database import Base


class MealEntry(Base):
    __tablename__ = "meal_entries"

    __table_args__ = (
        CheckConstraint(
            """
            NOT (recipe_id IS NOT NULL AND product_id IS NOT NULL)
            """,
            name="ck_meal_entries_single_source",
        ),
        CheckConstraint(
            "quantity > 0",
            name="ck_meal_entries_quantity_positive",
        ),
        CheckConstraint(
            "calories >= 0 AND proteins >= 0 "
            "AND fats >= 0 AND carbs >= 0",
            name="ck_meal_entries_nutrition_nonnegative",
        ),
        CheckConstraint(
            "meal_type IN ('breakfast', 'lunch', 'dinner', 'snack')",
            name="ck_meal_entries_meal_type",
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

    recipe_id: Mapped[uuid.UUID | None] = mapped_column(
        ForeignKey("recipes.id", ondelete="SET NULL"),
        nullable=True,
        index=True,
    )

    product_id: Mapped[uuid.UUID | None] = mapped_column(
        ForeignKey("products.id", ondelete="SET NULL"),
        nullable=True,
        index=True,
    )

    meal_type: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
    )

    consumed_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
    )

    quantity: Mapped[Decimal] = mapped_column(
        Numeric(10, 2),
        nullable=False,
    )

    unit: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
    )

    calories: Mapped[Decimal] = mapped_column(
        Numeric(10, 2),
        nullable=False,
    )

    proteins: Mapped[Decimal] = mapped_column(
        Numeric(10, 2),
        nullable=False,
    )

    fats: Mapped[Decimal] = mapped_column(
        Numeric(10, 2),
        nullable=False,
    )

    carbs: Mapped[Decimal] = mapped_column(
        Numeric(10, 2),
        nullable=False,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    user: Mapped["User"] = relationship(
        back_populates="meal_entries",
    )

    recipe: Mapped["Recipe | None"] = relationship()
    product: Mapped["Product | None"] = relationship()