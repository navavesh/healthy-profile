import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { Plus } from "lucide-react";

import type {
  DiaryEntry,
  DiaryEntryDraft,
  NutritionTotals,
} from "../types/collections";
import {
  createLocalId,
  readCollection,
  writeCollection,
} from "../utils/collectionStorage";
import DiaryDateNavigation from "../components/diary/DiaryDateNavigation";
import DiarySummary from "../components/diary/DiarySummary";
import DiaryEntryForm from "../components/diary/DiaryEntryForm";
import DiaryMealsList from "../components/diary/DiaryMealsList";
import DiaryEmptyState from "../components/diary/DiaryEmptyState";
import {
  DIARY_STORAGE_KEY,
  emptyDiaryEntryDraft,
  getTodayDate,
  isValidCompletedNumber,
  mealTypes,
} from "../components/diary/diaryConfig";

import "./CollectionPages.css";

function DiaryPage() {
  const [entries, setEntries] = useState<DiaryEntry[]>(() =>
    readCollection<DiaryEntry>(DIARY_STORAGE_KEY),
  );
  const [selectedDate, setSelectedDate] = useState(getTodayDate);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [draft, setDraft] = useState<DiaryEntryDraft>(emptyDiaryEntryDraft);
  const [error, setError] = useState("");

  useEffect(() => {
    writeCollection(DIARY_STORAGE_KEY, entries);
  }, [entries]);

  const dailyEntries = useMemo(
    () => entries.filter((entry) => entry.date === selectedDate),
    [entries, selectedDate],
  );

  const totals = useMemo<NutritionTotals>(
    () =>
      dailyEntries.reduce(
        (result, entry) => ({
          calories: result.calories + Number(entry.calories.replace(",", ".") || 0),
          proteins: result.proteins + Number(entry.proteins.replace(",", ".") || 0),
          fats: result.fats + Number(entry.fats.replace(",", ".") || 0),
          carbs: result.carbs + Number(entry.carbs.replace(",", ".") || 0),
        }),
        { calories: 0, proteins: 0, fats: 0, carbs: 0 },
      ),
    [dailyEntries],
  );

  function openForm() {
    setDraft(emptyDiaryEntryDraft);
    setError("");
    setIsFormOpen(true);
  }

  function closeForm() {
    setIsFormOpen(false);
    setDraft(emptyDiaryEntryDraft);
    setError("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!draft.name.trim()) {
      setError("Укажите название блюда.");
      return;
    }

    const numericValues = [
      draft.calories,
      draft.proteins,
      draft.fats,
      draft.carbs,
    ];

    const hasInvalidNumbers = numericValues.some(
      (value) => value !== "" && !isValidCompletedNumber(value),
    );

    if (!draft.calories || !isValidCompletedNumber(draft.calories) || hasInvalidNumbers) {
      setError("Укажите калории и проверьте числовые значения КБЖУ.");
      return;
    }

    const newEntry: DiaryEntry = {
      ...draft,
      name: draft.name.trim(),
      id: createLocalId(),
      date: selectedDate,
    };

    setEntries((current) => [...current, newEntry]);
    closeForm();
  }

  function deleteEntry(id: string) {
    setEntries((current) => current.filter((entry) => entry.id !== id));
  }

  function shiftDate(days: number) {
    const nextDate = new Date(`${selectedDate}T12:00:00`);
    nextDate.setDate(nextDate.getDate() + days);

    const year = nextDate.getFullYear();
    const month = String(nextDate.getMonth() + 1).padStart(2, "0");
    const day = String(nextDate.getDate()).padStart(2, "0");

    setSelectedDate(`${year}-${month}-${day}`);
  }

  return (
    <main className="collection-page">
      <header className="collection-header">
        <div>
          <span className="eyebrow">МОЁ ПИТАНИЕ</span>
          <h1>Дневник питания</h1>
          <p>Записывайте приёмы пищи и следите за КБЖУ.</p>
        </div>

        <button
          className="primary-action"
          type="button"
          onClick={openForm}
        >
          <Plus size={18} />
          Добавить приём пищи
        </button>
      </header>

      <DiaryDateNavigation
        date={selectedDate}
        onDateChange={setSelectedDate}
        onShiftDate={shiftDate}
        onToday={() => setSelectedDate(getTodayDate())}
      />

      <DiarySummary totals={totals} />

      {isFormOpen && (
        <DiaryEntryForm
          draft={draft}
          error={error}
          onChange={setDraft}
          onSubmit={handleSubmit}
          onClose={closeForm}
        />
      )}

      <DiaryMealsList
        meals={mealTypes}
        entries={dailyEntries}
        onDeleteEntry={deleteEntry}
      />

      {dailyEntries.length === 0 && <DiaryEmptyState />}
    </main>
  );
}

export default DiaryPage;
