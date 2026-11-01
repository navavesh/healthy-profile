import { NotebookPen } from "lucide-react";

function DiaryEmptyState() {
  return (
    <div className="diary-empty-note">
      <NotebookPen size={18} />
      Добавьте первый приём пищи за этот день.
    </div>
  );
}

export default DiaryEmptyState;
