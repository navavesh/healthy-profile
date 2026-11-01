import type { LucideIcon } from "lucide-react";

export type ProductCategory =
  | "vegetables"
  | "fruits"
  | "meat"
  | "dairy"
  | "grains"
  | "fish"
  | "other";

export type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  quantity: string;
  unit: string;
};

export type ProductDraft = Omit<Product, "id">;

export type ProductCategoryOption = {
  value: ProductCategory;
  label: string;
  Icon: LucideIcon;
};

export type RecipeSource = "manual" | "ai";

export type Recipe = {
  id: string;
  title: string;
  description: string;
  ingredients: string;
  time: string;
  source: RecipeSource;
  createdAt: string;
};

export type RecipeDraft = Omit<Recipe, "id" | "source" | "createdAt">;

export type DiaryEntry = {
  id: string;
  name: string;
  meal: string;
  calories: string;
  proteins: string;
  fats: string;
  carbs: string;
  date: string;
};

export type DiaryEntryDraft = Omit<DiaryEntry, "id" | "date">;

export type NutritionTotals = {
  calories: number;
  proteins: number;
  fats: number;
  carbs: number;
};
