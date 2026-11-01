import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { Plus, Search } from "lucide-react";

import type { Recipe, RecipeDraft } from "../types/collections";
import {
  readCollection,
  writeCollection,
  createLocalId,
} from "../utils/collectionStorage";
import {
  emptyRecipeDraft,
  isValidCookingTime,
  RECIPE_STORAGE_KEY,
} from "../components/recipes/recipeConfig";
import RecipeForm from "../components/recipes/RecipeForm";
import RecipesGrid from "../components/recipes/RecipesGrid";
import RecipesEmptyState from "../components/recipes/RecipesEmptyState";

import "./CollectionPages.css";

function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>(() =>
    readCollection<Recipe>(RECIPE_STORAGE_KEY),
  );
  const [search, setSearch] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [draft, setDraft] = useState<RecipeDraft>(emptyRecipeDraft);
  const [error, setError] = useState("");

  useEffect(() => {
    writeCollection(RECIPE_STORAGE_KEY, recipes);
  }, [recipes]);

  const filteredRecipes = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase("ru");

    return recipes.filter((recipe) =>
      `${recipe.title} ${recipe.ingredients}`
        .toLocaleLowerCase("ru")
        .includes(normalizedSearch),
    );
  }, [recipes, search]);

  function openForm() {
    setDraft(emptyRecipeDraft);
    setError("");
    setIsFormOpen(true);
  }

  function closeForm() {
    setIsFormOpen(false);
    setDraft(emptyRecipeDraft);
    setError("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!draft.title.trim()) {
      setError("Укажите название рецепта.");
      return;
    }

    if (!isValidCookingTime(draft.time)) {
      setError(
        "Укажите время в формате «15 минут» или «1 час 30 минут».",
      );
      return;
    }

    const newRecipe: Recipe = {
      ...draft,
      title: draft.title.trim(),
      id: createLocalId(),
      source: "manual",
      createdAt: new Date().toISOString(),
    };

    setRecipes((current) => [newRecipe, ...current]);
    closeForm();
  }

  function deleteRecipe(id: string) {
    setRecipes((current) =>
      current.filter((recipe) => recipe.id !== id),
    );
  }

  return (
    <main className="collection-page">
      <header className="collection-header">
        <div>
          <span className="eyebrow">МОЯ КОЛЛЕКЦИЯ</span>
          <h1>Мои рецепты</h1>
          <p>
            Сохраняйте любимые рецепты и рецепты, предложенные ИИ.
          </p>
        </div>

        <button
          className="primary-action"
          type="button"
          onClick={openForm}
        >
          <Plus size={18} />
          Добавить рецепт
        </button>
      </header>

      {isFormOpen && (
        <RecipeForm
          draft={draft}
          error={error}
          onChange={setDraft}
          onSubmit={handleSubmit}
          onClose={closeForm}
        />
      )}

      <section className="collection-toolbar">
        <label className="search-field">
          <Search size={18} />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Поиск по рецептам..."
          />
        </label>

        <span className="result-count">
          {recipes.length}{" "}
          {recipes.length === 1
            ? "рецепт"
            : recipes.length > 1 && recipes.length < 5
              ? "рецепта"
              : "рецептов"}
        </span>
      </section>

      {filteredRecipes.length > 0 ? (
        <RecipesGrid
          recipes={filteredRecipes}
          onDelete={deleteRecipe}
        />
      ) : (
        <RecipesEmptyState
          hasRecipes={recipes.length > 0}
          onAdd={openForm}
        />
      )}
    </main>
  );
}

export default RecipesPage;
