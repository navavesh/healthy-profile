import { Trash2 } from "lucide-react";

import type { DiaryEntry as DiaryEntryType } from "../../types/collections";

interface DiaryEntryProps {
  entry: DiaryEntryType;
  onDelete: (id: string) => void;
}

function DiaryEntry({ entry, onDelete }: DiaryEntryProps) {
  return (
    <div className="diary-entry">
      <div>
        <strong>{entry.name}</strong>
        <span>
          {entry.calories} ккал · Б {entry.proteins || 0} г · Ж{" "}
          {entry.fats || 0} г · У {entry.carbs || 0} г
        </span>
      </div>

      <button
        className="subtle-icon-button"
        type="button"
        aria-label={`Удалить запись ${entry.name}`}
        onClick={() => onDelete(entry.id)}
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}

export default DiaryEntry;
