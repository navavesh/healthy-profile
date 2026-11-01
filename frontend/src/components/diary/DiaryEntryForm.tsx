import type { FormEvent } from "react";
import { Check, X } from "lucide-react";

import type { DiaryEntryDraft } from "../../types/collections";
import { isValidNumericInput, mealTypes } from "./diaryConfig";

interface DiaryEntryFormProps {
  draft: DiaryEntryDraft;
  error: string;
  onChange: (draft: DiaryEntryDraft) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
}

function DiaryEntryForm({
  draft,
  error,
  onChange,
  onSubmit,
  onClose,
}: DiaryEntryFormProps) {
  function updateNumericField(
    field: "calories" | "proteins" | "fats" | "carbs",
    value: string,
  ) {
    if (isValidNumericInput(value)) {
      onChange({ ...draft, [field]: value });
    }
  }

  return (
    <section className="diary-form-card">
      <div className="diary-form-heading">
        <div>
          <h2>Новый приём пищи</h2>
          <p>Укажите блюдо и его пищевую ценность.</p>
        </div>

        <button
          className="diary-close-button"
          type="button"
          onClick={onClose}
          aria-label="Закрыть форму"
        >
          <X size={20} />
        </button>
      </div>

      <form onSubmit={onSubmit}>
        <label className="diary-field diary-name-field">
          <span>Название блюда</span>
          <input
            autoFocus
            value={draft.name}
            onChange={(event) =>
              onChange({ ...draft, name: event.target.value })
            }
            placeholder="Например, Омлет"
            maxLength={120}
            required
          />
        </label>

        <label className="diary-field">
          <span>Приём пищи</span>
          <select
            value={draft.meal}
            onChange={(event) =>
              onChange({ ...draft, meal: event.target.value })
            }
          >
            {mealTypes.map((meal) => (
              <option key={meal}>{meal}</option>
            ))}
          </select>
        </label>

        <label className="diary-field">
          <span>Калории, ккал</span>
          <input
            inputMode="decimal"
            value={draft.calories}
            onChange={(event) =>
              updateNumericField("calories", event.target.value)
            }
            placeholder="Например, 350"
            required
          />
        </label>

        <label className="diary-field">
          <span>Белки, г</span>
          <input
            inputMode="decimal"
            value={draft.proteins}
            onChange={(event) =>
              updateNumericField("proteins", event.target.value)
            }
            placeholder="Например, 20"
          />
        </label>

        <label className="diary-field">
          <span>Жиры, г</span>
          <input
            inputMode="decimal"
            value={draft.fats}
            onChange={(event) =>
              updateNumericField("fats", event.target.value)
            }
            placeholder="Например, 15"
          />
        </label>

        <label className="diary-field">
          <span>Углеводы, г</span>
          <input
            inputMode="decimal"
            value={draft.carbs}
            onChange={(event) =>
              updateNumericField("carbs", event.target.value)
            }
            placeholder="Например, 25"
          />
        </label>

        {error && <p className="form-error">{error}</p>}

        <div className="diary-form-actions">
          <button
            className="secondary-action"
            type="button"
            onClick={onClose}
          >
            Отмена
          </button>

          <button className="primary-action" type="submit">
            <Check size={17} />
            Добавить
          </button>
        </div>
      </form>
    </section>
  );
}

export default DiaryEntryForm;
