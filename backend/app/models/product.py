import uuid
from datetime import date, datetime
from decimal import Decimal

from sqlalchemy import (
    CheckConstraint,
    Date,
    DateTime,
    ForeignKey,
    Numeric,
    String,
    Uuid,
    func,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.database import Base


class Product(Base):
    __tablename__ = "products"

    __table_args__ = (
        CheckConstraint(
            "calories >= 0 AND proteins >= 0 AND fats >= 0 AND carbs >= 0",
            name="ck_products_nutrition_nonnegative",
        ),
        CheckConstraint(
            "nutrition_basis IN ('100g', '100ml')",
            name="ck_products_nutrition_basis",
        ),
    )

    id: Mapped[uuid.UUID] = mapped_column(
        Uuid(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )

    name: Mapped[str] = mapped_column(
        String(150),
        nullable=False,
        index=True,
    )

    category: Mapped[str | None] = mapped_column(String(50))

    calories: Mapped[Decimal] = mapped_column(
        Numeric(7, 2),
        nullable=False,
    )

    proteins: Mapped[Decimal] = mapped_column(
        Numeric(7, 2),
        nullable=False,
    )

    fats: Mapped[Decimal] = mapped_column(
        Numeric(7, 2),
        nullable=False,
    )

    carbs: Mapped[Decimal] = mapped_column(
        Numeric(7, 2),
        nullable=False,
    )

    nutrition_basis: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
        default="100g",
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    user_products: Mapped[list["UserProduct"]] = relationship(
        back_populates="product",
    )

    recipe_ingredients: Mapped[list["RecipeIngredient"]] = relationship(
        back_populates="product",
    )


class UserProduct(Base):
    __tablename__ = "user_products"

    __table_args__ = (
        CheckConstraint(
            "quantity > 0",
            name="ck_user_products_quantity_positive",
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

    product_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("products.id", ondelete="RESTRICT"),
        nullable=False,
        index=True,
    )

    quantity: Mapped[Decimal] = mapped_column(
        Numeric(10, 2),
        nullable=False,
    )

    unit: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
    )

    expiration_date: Mapped[date | None] = mapped_column(Date)

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    user: Mapped["User"] = relationship(
        back_populates="products",
    )

    product: Mapped["Product"] = relationship(
        back_populates="user_products",
    )