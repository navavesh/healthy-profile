import { Pencil, Trash2 } from "lucide-react";

import type { Product } from "../../types/collections";
import { getProductCategory } from "./productConfig";

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
  const category = getProductCategory(product.category);
  const CategoryIcon = category.Icon;

  return (
    <article className="products-item-card">
      <div className="products-item-card-top">
        <span className="products-item-card-icon">
          <CategoryIcon size={22} />
        </span>

        <div className="products-item-card-actions">
          <button
            type="button"
            onClick={() => onEdit(product)}
            aria-label={`Изменить ${product.name}`}
            title="Изменить"
          >
            <Pencil size={16} />
          </button>

          <button
            type="button"
            onClick={() => onDelete(product.id)}
            aria-label={`Удалить ${product.name}`}
            title="Удалить"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <h3>{product.name}</h3>
      <p>{category.label}</p>

      <div className="products-item-quantity">
        {product.quantity
          ? `${product.quantity} ${product.unit}`
          : "Количество не указано"}
      </div>
    </article>
  );
}

export default ProductCard;
