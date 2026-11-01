import type { RecipeDraft } from "../../types/collections";

export const RECIPE_STORAGE_KEY = "healthy-profile-recipes";

export const emptyRecipeDraft: RecipeDraft = {
  title: "",
  description: "",
  ingredients: "",
  time: "",
};

/**
 * Допустимые варианты: 15, 15 минут, 1 час, 1 час 30 минут.
 * Пустое значение допустимо: время приготовления необязательно.
 */
export function isValidCookingTime(value: string): boolean {
  const normalizedValue = value.trim();

  if (!normalizedValue) {
    return true;
  }

  return (
    /^\d+$/.test(normalizedValue) ||
    /^\d+\s*(?:минут(?:а|ы)?|мин\.?|час(?:а|ов)?|ч\.?)$/i.test(normalizedValue) ||
    /^\d+\s*(?:час(?:а|ов)?|ч\.?)\s+\d+\s*(?:минут(?:а|ы)?|мин\.?)$/i.test(normalizedValue)
  );
}
