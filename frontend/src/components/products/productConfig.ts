import {
  Apple,
  Beef,
  Carrot,
  Cookie,
  Fish,
  Milk,
  Wheat,
} from "lucide-react";

import type {
  ProductCategory,
  ProductCategoryOption,
  ProductDraft,
} from "../../types/collections";

export const PRODUCT_STORAGE_KEY = "healthy-profile:products";

export const productCategories: ProductCategoryOption[] = [
  { value: "vegetables", label: "Овощи", Icon: Carrot },
  { value: "fruits", label: "Фрукты", Icon: Apple },
  { value: "meat", label: "Мясо и птица", Icon: Beef },
  { value: "dairy", label: "Молочные продукты", Icon: Milk },
  { value: "grains", label: "Крупы и бакалея", Icon: Wheat },
  { value: "fish", label: "Рыба и морепродукты", Icon: Fish },
  { value: "other", label: "Другое", Icon: Cookie },
];

export const emptyProductDraft: ProductDraft = {
  name: "",
  category: "vegetables",
  quantity: "",
  unit: "шт.",
};

export const productUnits = ["шт.", "г", "кг", "мл", "л", "уп.", "по вкусу"];

export function getProductCategory(category: ProductCategory) {
  return productCategories.find((item) => item.value === category)
    ?? productCategories[productCategories.length - 1];
}

export function formatProductCount(count: number): string {
  if (count === 1) return "продукт в списке";
  if (count > 1 && count < 5) return "продукта в списке";
  return "продуктов в списке";
}
