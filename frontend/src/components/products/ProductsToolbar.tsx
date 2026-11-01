import { Search, X } from "lucide-react";

interface ProductsToolbarProps {
  search: string;
  resultCount: number;
  totalCount: number;
  onSearchChange: (value: string) => void;
}

function ProductsToolbar({
  search,
  resultCount,
  totalCount,
  onSearchChange,
}: ProductsToolbarProps) {
  return (
    <section className="products-toolbar">
      <label className="products-search">
        <Search size={19} />

        <input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Найти продукт..."
        />

        {search && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            aria-label="Очистить поиск"
          >
            <X size={16} />
          </button>
        )}
      </label>

      <span className="products-result-count">
        {resultCount} из {totalCount}
      </span>
    </section>
  );
}

export default ProductsToolbar;
