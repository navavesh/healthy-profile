import { ChevronLeft, ChevronRight } from "lucide-react";

interface DiaryDateNavigationProps {
  date: string;
  onDateChange: (date: string) => void;
  onShiftDate: (days: number) => void;
  onToday: () => void;
}

function DiaryDateNavigation({
  date,
  onDateChange,
  onShiftDate,
  onToday,
}: DiaryDateNavigationProps) {
  const formattedDate = new Date(`${date}T12:00:00`).toLocaleDateString(
    "ru-RU",
    { day: "numeric", month: "long", year: "numeric" },
  );

  return (
    <section className="diary-date-row">
      <button
        className="icon-button"
        type="button"
        onClick={() => onShiftDate(-1)}
        aria-label="Предыдущий день"
      >
        <ChevronLeft />
      </button>

      <strong>{formattedDate}</strong>

      <button
        className="icon-button"
        type="button"
        onClick={() => onShiftDate(1)}
        aria-label="Следующий день"
      >
        <ChevronRight />
      </button>

      <button className="today-button" type="button" onClick={onToday}>
        Сегодня
      </button>

      <input
        aria-label="Выбрать дату"
        type="date"
        value={date}
        onChange={(event) => onDateChange(event.target.value)}
      />
    </section>
  );
}

export default DiaryDateNavigation;
