import type { NutritionTotals } from "../../types/collections";

interface DiarySummaryProps {
  totals: NutritionTotals;
}

function DiarySummary({ totals }: DiarySummaryProps) {
  return (
    <section className="macro-summary">
      <div>
        <span>Калории</span>
        <strong>{Math.round(totals.calories)} <small>ккал</small></strong>
      </div>

      <div>
        <span>Белки</span>
        <strong>{totals.proteins} <small>г</small></strong>
      </div>

      <div>
        <span>Жиры</span>
        <strong>{totals.fats} <small>г</small></strong>
      </div>

      <div>
        <span>Углеводы</span>
        <strong>{totals.carbs} <small>г</small></strong>
      </div>
    </section>
  );
}

export default DiarySummary;
