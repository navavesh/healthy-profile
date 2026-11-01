import uuid
from datetime import datetime
from decimal import Decimal

from sqlalchemy import (
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
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.database import Base


class Recipe(Base):
    __tablename__ = "recipes"

    __table_args__ = (
        CheckConstraint(
            "servings > 0",
            name="ck_recipes_servings_positive",
        ),
        CheckConstraint(
            "cooking_time_minutes IS NULL OR cooking_time_minutes > 0",
            name="ck_recipes_cooking_time_positive",
        ),
        CheckConstraint(
            "source IN ('ai', 'manual')",
            name="ck_recipes_source",
        ),
        CheckConstraint(
            "restriction_check_status IN "
            "('pending', 'passed', 'failed', 'needs_review')",
            name="ck_recipes_restriction_status",
        ),
        CheckConstraint(
            "nutrition_status IN "
            "('not_calculated', 'calculated', 'insufficient_data')",
            name="ck_recipes_nutrition_status",
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

    title: Mapped[str] = mapped_column(
        String(200),
        nullable=False,
    )

    description: Mapped[str | None] = mapped_column(Text)

    source: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
        default="ai",
    )

    instructions: Mapped[list] = mapped_column(
        JSONB,
        nullable=False,
    )

    servings: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        default=1,
    )

    cooking_time_minutes: Mapped[int | None] = mapped_column(Integer)

    restriction_check_status: Mapped[str] = mapped_column(
        String(30),
        nullable=False,
        default="pending",
    )

    nutrition_status: Mapped[str] = mapped_column(
        String(30),
        nullable=False,
        default="not_calculated",
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

    user: Mapped["User"] = relationship(
        back_populates="recipes",
    )

    ingredients: Mapped[list["RecipeIngredient"]] = relationship(
        back_populates="recipe",
        cascade="all, delete-orphan",
        order_by="RecipeIngredient.sort_order",
    )


class RecipeIngredient(Base):
    __tablename__ = "recipe_ingredients"

    __table_args__ = (
        CheckConstraint(
            "quantity > 0",
            name="ck_recipe_ingredients_quantity_positive",
        ),
        CheckConstraint(
            "sort_order >= 0",
            name="ck_recipe_ingredients_sort_order",
        ),
    )

    id: Mapped[uuid.UUID] = mapped_column(
        Uuid(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )

    recipe_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("recipes.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    product_id: Mapped[uuid.UUID | None] = mapped_column(
        ForeignKey("products.id", ondelete="RESTRICT"),
        nullable=True,
        index=True,
    )

    ingredient_name: Mapped[str] = mapped_column(
        String(150),
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

    sort_order: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        default=0,
    )

    recipe: Mapped["Recipe"] = relationship(
        back_populates="ingredients",
    )

    product: Mapped["Product | None"] = relationship(
        back_populates="recipe_ingredients",
    )