import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { Plus } from "lucide-react";

import type {
  Product,
  ProductCategory,
  ProductDraft,
} from "../types/collections";
import { readCollection, writeCollection, createLocalId } from "../utils/collectionStorage";
import {
  PRODUCT_STORAGE_KEY,
  emptyProductDraft,
} from "../components/products/productConfig";
import ProductSummary from "../components/products/ProductSummary";
import ProductForm from "../components/products/ProductForm";
import ProductsToolbar from "../components/products/ProductsToolbar";
import ProductCategoryFilter from "../components/products/ProductCategoryFilter";
import ProductsGrid from "../components/products/ProductsGrid";
import ProductsEmptyState from "../components/products/ProductsEmptyState";

import "./ProductsPage.css";

function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(() =>
    readCollection<Product>(PRODUCT_STORAGE_KEY),
  );
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<ProductCategory | "all">("all");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<ProductDraft>(emptyProductDraft);

  useEffect(() => {
    writeCollection(PRODUCT_STORAGE_KEY, products);
  }, [products]);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase("ru");

    return products.filter((product) => {
      const matchesSearch = product.name
        .toLocaleLowerCase("ru")
        .includes(normalizedSearch);
      const matchesCategory =
        activeCategory === "all" || product.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [products, search, activeCategory]);

  const categoryCounts = useMemo(
    () =>
      products.reduce((counts, product) => {
        counts[product.category] = (counts[product.category] ?? 0) + 1;
        return counts;
      }, {} as Partial<Record<ProductCategory, number>>),
    [products],
  );

  function openCreateForm() {
    setEditingId(null);
    setDraft(emptyProductDraft);
    setIsFormOpen(true);
  }

  function openEditForm(product: Product) {
    setEditingId(product.id);
    setDraft({
      name: product.name,
      category: product.category,
      quantity: product.quantity,
      unit: product.unit,
    });
    setIsFormOpen(true);
  }

  function closeForm() {
    setIsFormOpen(false);
    setEditingId(null);
    setDraft(emptyProductDraft);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const name = draft.name.trim();
    if (!name) return;

    if (editingId) {
      setProducts((current) =>
        current.map((product) =>
          product.id === editingId
            ? { ...draft, name, id: editingId }
            : product,
        ),
      );
    } else {
      setProducts((current) => [
        ...current,
        { ...draft, name, id: createLocalId() },
      ]);
    }

    closeForm();
  }

  function deleteProduct(id: string) {
    if (window.confirm("Удалить этот продукт из списка?")) {
      setProducts((current) =>
        current.filter((product) => product.id !== id),
      );
    }
  }

  function resetFilters() {
    setSearch("");
    setActiveCategory("all");
  }

  return (
    <main className="products-page">
      <header className="products-page-header">
        <div>
          <div className="products-eyebrow">ВАША ПРОДУКТОВАЯ КОРЗИНА</div>
          <h1>Мои продукты</h1>
          <p>
            Добавляйте продукты, которые есть у вас дома, чтобы подбирать
            рецепты из доступных ингредиентов.
          </p>
        </div>

        <button
          className="products-add-button"
          type="button"
          onClick={openCreateForm}
        >
          <Plus size={19} />
          Добавить продукт
        </button>
      </header>

      <ProductSummary count={products.length} />

      {isFormOpen && (
        <ProductForm
          draft={draft}
          editing={editingId !== null}
          onChange={setDraft}
          onSubmit={handleSubmit}
          onClose={closeForm}
        />
      )}

      <ProductsToolbar
        search={search}
        resultCount={filteredProducts.length}
        totalCount={products.length}
        onSearchChange={setSearch}
      />

      <ProductCategoryFilter
        activeCategory={activeCategory}
        categoryCounts={categoryCounts}
        totalCount={products.length}
        onCategoryChange={setActiveCategory}
      />

      {filteredProducts.length > 0 ? (
        <ProductsGrid
          products={filteredProducts}
          onEdit={openEditForm}
          onDelete={deleteProduct}
        />
      ) : (
        <ProductsEmptyState
          hasProducts={products.length > 0}
          onAdd={openCreateForm}
          onResetFilters={resetFilters}
        />
      )}
    </main>
  );
}

export default ProductsPage;
