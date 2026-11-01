import { Refrigerator } from "lucide-react";

import { formatProductCount } from "./productConfig";

interface ProductSummaryProps {
  count: number;
}

function ProductSummary({ count }: ProductSummaryProps) {
  return (
    <section className="products-summary">
      <div className="products-summary-icon">
        <Refrigerator size={25} />
      </div>

      <div>
        <strong>{count}</strong>
        <span>{formatProductCount(count)}</span>
      </div>

      <div className="products-summary-note">
        Список будет учитываться при подборе рецептов в чате с ИИ.
      </div>
    </section>
  );
}

export default ProductSummary;
