import ingredientsData from "../data/ingredients";
import Recipe from "./Recipe";

class RecipeRepository {
  constructor(recipes, ingredientsData) {
    this.recipes = recipes;
    this.ingredients = ingredientsData;
  }

  filterRecipesTags(tags) {
    const matches = [];
    this.recipes.forEach(recipe => {
      tags.forEach(tag => {
        if (recipe.tags.includes(tag)) {
        matches.push(recipe);
      }
      })
    })
    return matches
  }

  filterRecipesByName(input) {
    const recipeMatch = this.recipes.filter(recipe => {
        return recipe.name  === input;
    });
    if (!recipeMatch[0]) {
      return this.filterRecipesByIngredients(input)
    } else {
      return recipeMatch
    }
  }

  filterRecipesByIngredients(input) {
    let matches = [];
    console.log(this.ingredients);
    let match = this.ingredients.find(ingredient => {
      return ingredient.name.includes(input)
    })
    if (!match) {
      return "Sorry, we could not find any recipes to match your search"
    } else {
      this.recipes.filter(recipe => {
        recipe.ingredients.forEach(ingredient => {
          if (ingredient.id === match.id) {
            matches.push(recipe)
          }
        })
      })
      return matches
    }
    }
}

export default RecipeRepository;
