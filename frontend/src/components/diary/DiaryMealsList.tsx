import type { DiaryEntry } from "../../types/collections";
import DiaryMealSection from "./DiaryMealSection";

interface DiaryMealsListProps {
  meals: string[];
  entries: DiaryEntry[];
  onDeleteEntry: (id: string) => void;
}

function DiaryMealsList({
  meals,
  entries,
  onDeleteEntry,
}: DiaryMealsListProps) {
  return (
    <section className="diary-meals">
      {meals.map((meal) => (
        <DiaryMealSection
          key={meal}
          meal={meal}
          entries={entries.filter((entry) => entry.meal === meal)}
          onDeleteEntry={onDeleteEntry}
        />
      ))}
    </section>
  );
}

export default DiaryMealsList;
