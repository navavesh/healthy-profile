import { BookOpen, Clock3, Trash2 } from "lucide-react";

import type { Recipe } from "../../types/collections";

interface RecipeCardProps {
  recipe: Recipe;
  onDelete: (id: string) => void;
}

function RecipeCard({ recipe, onDelete }: RecipeCardProps) {
  return (
    <article className="recipe-card">
      <div className="recipe-card-top">
        <div className="product-card-icon">
          <BookOpen size={22} />
        </div>

        <button
          className="subtle-icon-button"
          type="button"
          aria-label={`Удалить рецепт ${recipe.title}`}
          onClick={() => onDelete(recipe.id)}
        >
          <Trash2 size={16} />
        </button>
      </div>

      <h2>{recipe.title}</h2>

      {recipe.description && <p>{recipe.description}</p>}

      {recipe.ingredients && (
        <div className="recipe-ingredients">
          <strong>Ингредиенты</strong>
          <span>{recipe.ingredients}</span>
        </div>
      )}

      <div className="recipe-meta">
        {recipe.time && (
          <span>
            <Clock3 size={14} />
            {recipe.time}
          </span>
        )}

        <span className="source-label">
          {recipe.source === "ai" ? "Предложен ИИ" : "Добавлен вручную"}
        </span>
      </div>
    </article>
  );
}

export default RecipeCard;
