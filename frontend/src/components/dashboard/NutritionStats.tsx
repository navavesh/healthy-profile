import { Flame, ChartNoAxesColumn, Droplets, Wheat } from "lucide-react";

import "./NutritionStats.css";

const nutritionItems = [
{
title: "Калории за сегодня",
value: 0,
unit: "ккал",
target: 2200,
icon: Flame,
type: "calories",
},
{
title: "Белки",
value: 0,
unit: "г",
target: 160,
icon: ChartNoAxesColumn,
type: "protein",
},
{
title: "Жиры",
value: 0,
unit: "г",
target: 70,
icon: Droplets,
type: "fat",
},
{
title: "Углеводы",
value: 0,
unit: "г",
target: 275,
icon: Wheat,
type: "carbs",
},
];

function NutritionStats() {
return ( <section className="nutrition-stats" aria-label="Показатели питания">
{nutritionItems.map((item) => {
const Icon = item.icon;

    const percentage =
      item.target > 0
        ? Math.min(100, Math.round((item.value / item.target) * 100))
        : 0;

    return (
      <article
        className={`nutrition-stat nutrition-stat--${item.type}`}
        key={item.type}
      >
        <Icon className="nutrition-stat-icon" size={32} strokeWidth={2.2} />

        <h2>{item.title}</h2>

        <div className="nutrition-stat-data">
          <div>
            <p className="nutrition-stat-value">
              {item.value} {item.unit}
            </p>

            <p className="nutrition-stat-target">
              из {item.target} {item.unit}
            </p>
          </div>

          <div
            className="nutrition-stat-progress"
            role="progressbar"
            aria-label={`${item.title}: выполнение цели`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={percentage}
          >
            <span>{percentage}%</span>
          </div>
        </div>

        <div className="nutrition-stat-track">
          <div
            className="nutrition-stat-track-fill"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </article>
    );
  })}
</section>

);
}

export default NutritionStats;