import  Recipe  from "./Recipe";

class User {
  constructor(id, name, pantry) {
    this.id = id;
    this.name = name;
    this.pantry = pantry;
    this.favoriteRecipes = [];
    this.recipesToCook = [];
    }

  addToFavoriteRecipes(recipe) {
    if(!this.favoriteRecipes.includes(recipe)) {
     this.favoriteRecipes.push(recipe)
    }
  }

  removeFromFavoriteRecipes(input) {
    this.favoriteRecipes.forEach(recipe =>{
      if (input.name === recipe.name) {
        this.favoriteRecipes.splice(input, 1)
      }
    })
  }

  addToRecipesToCook(recipe) {
    if(!this.recipesToCook.includes(recipe)) {
     this.recipesToCook.push(recipe)
    }
  }

  filterFavRecipesTags(tags) {
    const matches = [];
    this.favoriteRecipes.forEach(recipe => {
      tags.forEach(tag => {
        if (recipe.tags.includes(tag)) {
        matches.push(recipe);
      }
      })
    })
    if (!matches.length) {
      return "Sorry, we could not find any recipes with that tag"
    } else {
      return matches
    }
  }

  filterFavRecipesByName(input, ingredientsData) {
    const recipeMatch = this.favoriteRecipes.filter(recipe => {
        return recipe.name  === input;
    });
    if (!recipeMatch.length) {
      this.filterFavRecipesByIngredients(input, ingredientsData)
    } else {
      return recipeMatch
    }
  }

  filterFavRecipesByIngredients(input, ingredientsData) {
    let matches = [];
    let nameMatch = ingredientsData.find(ingredient => {
      if (ingredient.name.includes(input)) {
        return ingredient
      }
    })
    this.favoriteRecipes.forEach(recipe => {
      recipe.ingredients.find(ingredient => {
        if (nameMatch && (ingredient.id === nameMatch.id)) {
          return matches.push(recipe)
        }
      })
    })
    if (!matches.length) {
      return "Sorry, we could not find any recipes to match your search"
    } else {
      return matches
    }
  }
}


export default User;
