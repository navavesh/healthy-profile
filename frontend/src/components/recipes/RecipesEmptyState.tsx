import { BookOpen, Plus } from "lucide-react";

interface RecipesEmptyStateProps {
  hasRecipes: boolean;
  onAdd: () => void;
}

function RecipesEmptyState({ hasRecipes, onAdd }: RecipesEmptyStateProps) {
  return (
    <section className="empty-state">
      <div className="empty-icon">
        <BookOpen size={30} />
      </div>

      <h2>
        {hasRecipes
          ? "Ничего не найдено"
          : "В вашей коллекции пока пусто"}
      </h2>

      <p>
        Добавляйте собственные рецепты. В дальнейшем сюда также можно будет
        сохранять рецепты прямо из чата с ИИ.
      </p>

      {!hasRecipes && (
        <button className="primary-action" type="button" onClick={onAdd}>
          <Plus size={18} />
          Добавить рецепт
        </button>
      )}
    </section>
  );
}

export default RecipesEmptyState;
