import { RecipeModel } from '../../app/global/models/recipes/recipe.model';

export const findMainRecipe = (recipes: RecipeModel[]) => {
  let favoriteRecipes: RecipeModel[] = [];
  let allIngredientRecipes: RecipeModel[] = [];

  for (let recipe of recipes) {
    if (recipe.favorite) {
      favoriteRecipes.push(recipe);
    }
    if (recipe.allIngredientsAvailable) {
      allIngredientRecipes.push(recipe);
    }
  }

  let bestRecipes = favoriteRecipes.filter(o1 => allIngredientRecipes.some(o2 => o1.name === o2.name));

  if (bestRecipes.length > 0) {
    return bestRecipes[Math.floor(Math.random()*bestRecipes.length)]; //1 random apo oses einai favorites kai exoume ola ta ingredients
  }

  if (favoriteRecipes.length > 0) {
    return favoriteRecipes[Math.floor(Math.random()*favoriteRecipes.length)]; //alliws 1 random apo ta favorites
  }

  if (allIngredientRecipes.length > 0) {
    return allIngredientRecipes[Math.floor(Math.random()*allIngredientRecipes.length)]; //alliws 1 random me ola ta ingredients present
  }

  return recipes[Math.floor(Math.random()*recipes.length)]; //alliws 1 random apo oles

};
