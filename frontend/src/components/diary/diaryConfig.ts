import type { DiaryEntryDraft } from "../../types/collections";

export const DIARY_STORAGE_KEY = "healthy-profile-diary";

export const mealTypes = ["Завтрак", "Обед", "Ужин", "Перекус"];

export const emptyDiaryEntryDraft: DiaryEntryDraft = {
  name: "",
  meal: "Завтрак",
  calories: "",
  proteins: "",
  fats: "",
  carbs: "",
};

export function getTodayDate(): string {
  const now = new Date();
  const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000);

  return localDate.toISOString().slice(0, 10);
}

export function isValidNumericInput(value: string): boolean {
  return /^\d*(?:[.,]\d*)?$/.test(value);
}

export function isValidCompletedNumber(value: string): boolean {
  return /^\d+(?:[.,]\d+)?$/.test(value);
}
