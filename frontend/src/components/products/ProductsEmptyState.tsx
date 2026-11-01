import { Package, Plus } from "lucide-react";

interface ProductsEmptyStateProps {
  hasProducts: boolean;
  onAdd: () => void;
  onResetFilters: () => void;
}

function ProductsEmptyState({
  hasProducts,
  onAdd,
  onResetFilters,
}: ProductsEmptyStateProps) {
  return (
    <section className="products-empty">
      <div className="products-empty-icon">
        <Package size={31} />
      </div>

      <h2>{hasProducts ? "Ничего не найдено" : "Пока здесь пусто"}</h2>

      <p>
        {hasProducts
          ? "Попробуйте изменить поисковый запрос или выбрать другую категорию."
          : "Добавьте продукты, которые есть у вас дома. Они помогут ИИ подобрать подходящие рецепты."}
      </p>

      {hasProducts ? (
        <button
          type="button"
          className="product-secondary-button"
          onClick={onResetFilters}
        >
          Сбросить фильтры
        </button>
      ) : (
        <button type="button" className="products-add-button" onClick={onAdd}>
          <Plus size={18} />
          Добавить первый продукт
        </button>
      )}
    </section>
  );
}

export default ProductsEmptyState;
