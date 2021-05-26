// import  Recipe  from "./Recipe";
// import ingredientsData from "../data/ingredients";

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
    if (!matches[0]) {
      return "Sorry, we could not find any recipes with that tag"
    } else {
      return matches
    }
  }

  filterFavRecipesByName(input, ingredientsData) {
    const recipeMatch = this.favoriteRecipes.filter(recipe => {
        return recipe.name  === input;
    });
    if (!recipeMatch[0]) {
      this.filterFavRecipesByIngredients(input, ingredientsData)
    } else {
      return recipeMatch
    }
  }

  filterFavRecipesByIngredients(input, ingredientsData) {
    let matches = [];
    //console.log(ingredientsData)
    let nameMatch = ingredientsData.find(ingredient => {
      //console.log(ingredient.name)
      if (ingredient.name.includes(input)) {
        return ingredient
      }
    })
    //console.log(nameMatch)
    this.favoriteRecipes.forEach(recipe => {
      recipe.ingredients.find(ingredient => {
        //fix data handling here - make it match the test data
        //console.log("this is ingreident.id", ingredient.id)
        //console.log("this is name match id", nameMatch.id)
        if (ingredient.id === nameMatch.id) {
          //return ingredient
          return matches.push(recipe)
        }
        //return matches.push(recipe)
      })
    })
    //console.log(match)
    if (!matches[0]) {
      return "Sorry, we could not find any recipes to match your search"
    } else {
      return matches
    }
  }

}


export default User;
