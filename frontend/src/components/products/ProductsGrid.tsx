import type { Product } from "../../types/collections";
import ProductCard from "./ProductCard";

interface ProductsGridProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

function ProductsGrid({ products, onEdit, onDelete }: ProductsGridProps) {
  return (
    <section className="products-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </section>
  );
}

export default ProductsGrid;
