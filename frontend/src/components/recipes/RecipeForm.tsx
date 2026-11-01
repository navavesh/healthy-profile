import type { FormEvent } from "react";
import { X } from "lucide-react";

import type { RecipeDraft } from "../../types/collections";

interface RecipeFormProps {
  draft: RecipeDraft;
  error: string;
  onChange: (draft: RecipeDraft) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
}

function RecipeForm({
  draft,
  error,
  onChange,
  onSubmit,
  onClose,
}: RecipeFormProps) {
  return (
    <section className="recipe-form-card">
      <div className="recipe-form-heading">
        <div>
          <h2>Новый рецепт</h2>
          <p>Укажите название, описание и ингредиенты блюда.</p>
        </div>

        <button
          type="button"
          className="recipe-close-button"
          onClick={onClose}
          aria-label="Закрыть форму"
        >
          <X size={20} />
        </button>
      </div>

      <form onSubmit={onSubmit}>
        <label className="recipe-field recipe-title-field">
          <span>Название</span>
          <input
            autoFocus
            value={draft.title}
            onChange={(event) =>
              onChange({ ...draft, title: event.target.value })
            }
            maxLength={120}
            placeholder="Например, Овсяная каша с ягодами"
            required
          />
        </label>

        <label className="recipe-field recipe-time-field">
          <span>Время приготовления</span>
          <input
            type="text"
            value={draft.time}
            onChange={(event) =>
              onChange({ ...draft, time: event.target.value })
            }
            placeholder="Например, 15 минут"
            maxLength={40}
          />
        </label>

        <label className="recipe-field recipe-wide-field">
          <span>Краткое описание</span>
          <textarea
            value={draft.description}
            onChange={(event) =>
              onChange({ ...draft, description: event.target.value })
            }
            rows={2}
            placeholder="Что это за блюдо?"
          />
        </label>

        <label className="recipe-field recipe-wide-field">
          <span>Ингредиенты</span>
          <textarea
            value={draft.ingredients}
            onChange={(event) =>
              onChange({ ...draft, ingredients: event.target.value })
            }
            rows={3}
            placeholder="Овсянка, молоко, ягоды..."
          />
        </label>

        {error && <p className="form-error recipe-form-error">{error}</p>}

        <div className="recipe-form-actions">
          <button
            type="button"
            className="recipe-secondary-button"
            onClick={onClose}
          >
            Отмена
          </button>
          <button className="primary-action" type="submit">
            Сохранить рецепт
          </button>
        </div>
      </form>
    </section>
  );
}

export default RecipeForm;
