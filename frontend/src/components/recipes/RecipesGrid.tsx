import type { Recipe } from "../../types/collections";
import RecipeCard from "./RecipeCard";

interface RecipesGridProps {
  recipes: Recipe[];
  onDelete: (id: string) => void;
}

function RecipesGrid({ recipes, onDelete }: RecipesGridProps) {
  return (
    <section className="recipe-grid">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          onDelete={onDelete}
        />
      ))}
    </section>
  );
}

export default RecipesGrid;
