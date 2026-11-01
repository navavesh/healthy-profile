import type { ProductCategory } from "../../types/collections";
import { productCategories } from "./productConfig";

interface ProductCategoryFilterProps {
  activeCategory: ProductCategory | "all";
  categoryCounts: Partial<Record<ProductCategory, number>>;
  totalCount: number;
  onCategoryChange: (category: ProductCategory | "all") => void;
}

function ProductCategoryFilter({
  activeCategory,
  categoryCounts,
  totalCount,
  onCategoryChange,
}: ProductCategoryFilterProps) {
  return (
    <nav className="products-categories" aria-label="Категории продуктов">
      <button
        type="button"
        className={activeCategory === "all" ? "active" : ""}
        onClick={() => onCategoryChange("all")}
      >
        Все продукты <span>{totalCount}</span>
      </button>

      {productCategories.map(({ value, label }) => (
        <button
          type="button"
          key={value}
          className={activeCategory === value ? "active" : ""}
          onClick={() => onCategoryChange(value)}
        >
          {label}
          <span>{categoryCounts[value] ?? 0}</span>
        </button>
      ))}
    </nav>
  );
}

export default ProductCategoryFilter;
