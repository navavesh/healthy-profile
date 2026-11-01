import type { FormEvent } from "react";
import { Check, X } from "lucide-react";

import type { ProductCategory, ProductDraft } from "../../types/collections";
import { productCategories, productUnits } from "./productConfig";

interface ProductFormProps {
  draft: ProductDraft;
  editing: boolean;
  onChange: (draft: ProductDraft) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
}

function ProductForm({
  draft,
  editing,
  onChange,
  onSubmit,
  onClose,
}: ProductFormProps) {
  function updateQuantity(value: string) {
    // Разрешаем целые и десятичные числа, включая запятую.
    if (/^\d*(?:[.,]\d*)?$/.test(value)) {
      onChange({ ...draft, quantity: value });
    }
  }

  return (
    <section className="product-form-card">
      <div className="product-form-heading">
        <div>
          <h2>{editing ? "Редактировать продукт" : "Новый продукт"}</h2>
          <p>Укажите название и количество продукта.</p>
        </div>

        <button
          className="product-close-button"
          type="button"
          onClick={onClose}
          aria-label="Закрыть форму"
        >
          <X size={20} />
        </button>
      </div>

      <form onSubmit={onSubmit}>
        <label className="product-field product-name-field">
          <span>Название продукта</span>
          <input
            autoFocus
            value={draft.name}
            onChange={(event) =>
              onChange({ ...draft, name: event.target.value })
            }
            placeholder="Например, Помидоры"
            maxLength={80}
            required
          />
        </label>

        <label className="product-field">
          <span>Категория</span>
          <select
            value={draft.category}
            onChange={(event) =>
              onChange({
                ...draft,
                category: event.target.value as ProductCategory,
              })
            }
          >
            {productCategories.map(({ value, label }) => (
              <option value={value} key={value}>
                {label}
              </option>
            ))}
          </select>
        </label>

        <label className="product-field">
          <span>Количество</span>
          <input
            type="text"
            inputMode="decimal"
            value={draft.quantity}
            onChange={(event) => updateQuantity(event.target.value)}
            placeholder="Например, 500"
            maxLength={30}
          />
        </label>

        <label className="product-field">
          <span>Единица измерения</span>
          <select
            value={draft.unit}
            onChange={(event) =>
              onChange({ ...draft, unit: event.target.value })
            }
          >
            {productUnits.map((unit) => (
              <option key={unit}>{unit}</option>
            ))}
          </select>
        </label>

        <div className="product-form-actions">
          <button
            type="button"
            className="product-secondary-button"
            onClick={onClose}
          >
            Отмена
          </button>

          <button type="submit" className="product-submit-button">
            <Check size={17} />
            {editing ? "Сохранить" : "Добавить"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default ProductForm;
