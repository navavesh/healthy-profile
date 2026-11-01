import type { DiaryEntry as DiaryEntryType } from "../../types/collections";
import DiaryEntry from "./DiaryEntry";

interface DiaryMealSectionProps {
  meal: string;
  entries: DiaryEntryType[];
  onDeleteEntry: (id: string) => void;
}

function DiaryMealSection({
  meal,
  entries,
  onDeleteEntry,
}: DiaryMealSectionProps) {
  return (
    <article className="diary-meal">
      <div className="diary-meal-heading">
        <h2>{meal}</h2>
        <span>{entries.length} записей</span>
      </div>

      {entries.length > 0 ? (
        entries.map((entry) => (
          <DiaryEntry
            key={entry.id}
            entry={entry}
            onDelete={onDeleteEntry}
          />
        ))
      ) : (
        <p className="meal-empty">Пока нет записей</p>
      )}
    </article>
  );
}

export default DiaryMealSection;
