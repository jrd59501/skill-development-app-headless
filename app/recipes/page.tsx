import { getAllRecipes } from "../../lib/api";

export default async function RecipesPage() {
  // Get the recipes from Contentful
  const recipes = await getAllRecipes();

  return (
    <div className="container mx-auto px-5 py-10">
      <h1 className="text-4xl font-bold mb-8">Recipes</h1>

      <div className="grid gap-8 md:grid-cols-2">
        {recipes.map((recipe: any) => (
          <div key={recipe.slug} className="border rounded-lg p-4">
            <img
              src={recipe.image.url}
              alt={recipe.title}
              className="w-full h-60 object-cover rounded"
            />
            <p className="text-sm text-gray-500 mt-4">{recipe.category}</p>
            <h2 className="text-2xl font-semibold">{recipe.title}</h2>
            <p className="mt-2 whitespace-pre-line">{recipe.ingredients}</p>
          </div>
        ))}
      </div>
    </div>
  );
}