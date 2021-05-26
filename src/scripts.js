import './styles.css';
import apiCalls from './apiCalls';


// Import classes
import { ingPromise } from './apiCalls';
import { recPromise } from './apiCalls';
import { userPromise } from './apiCalls';
import  Recipe  from "./classes/Recipe";
import  Ingredient  from './classes/Ingredient';
import  RecipeRepository  from './classes/RecipeRepository';
// import  ApiHost  from './apiCalls';
// import  recipeData  from './data/recipes.js';
import  ingredientsData  from './data/ingredients.js';

let instantiatedRecipes = [];
// let apiCall =  new ApiHost();

// const apiIng = apiCall.getIngredients();
// const apiRecipes = apiCall.getRecipes();
// const apiUsers = apiCall.getUsers();
// console.log(apiIng);
// console.log(apiRecipes);
// console.log(apiUsers);

// console.log(apiCall.getIngredients());
// apiCall.getRecipes();
//We will be instantiating Recipes here from data
//event listener on window load for this function?


//let recipeRepo = new RecipeRepository(recipeData);
// let recipeRepo = new RecipeRepository(instantiatedRecipes, ingredientsData);




let recipeRepo, recipeData, ingredients

window.addEventListener("load", getData);

function getData() {
  let ingredientPromise = ingPromise()
    .then(data => data)
  let recipePromise = recPromise()
    .then(data => data)
  let usersPromise = userPromise()
    .then(data => data)
  Promise.all([ingredientPromise, recipePromise, usersPromise])
  .then(data => initalizedData(data))
  .catch(error => console.log(error));
  // return Promise.all([ingPromise, recPromise])
  // .catch()
}



function initalizedData([ingredients, recipes, users]) {
  // let recipeRepo, recipe, ingredients
  recipeData = recipes.recipeData;
  // console.log(recipes);
  // console.log(recipe);
  // let instantiatedRecipes = [];
  // let recipeRepo = new RecipeRepository(instantiatedRecipes, ingredientsData);
  recipeRepo = new RecipeRepository(instantiatedRecipes, ingredients)
  instantiateRecipes(recipeData)
  console.log("hl");
  console.log(recipeRepo);
  showHomeView()
}










// DOM !!!
// Buttons
const allRecipesButton = document.getElementById("allRecipesButton");
const favoriteButton = document.getElementById("favoriteButton");
const toCookButton = document.getElementById("toCookButton");
const addToFavoriteButton = document.getElementById("addToFavoriteButton");
const addtoCookButton = document.getElementById("addtoCookButton");
// Submit Buttons
const homeViewBtn = document.getElementById("homeViewBtn");
const filterNameIngInput = document.getElementById("filterNameIngInput");
const submitNameIng = document.getElementById("submitNameIng");
const submitTagsButton = document.getElementById("submitTagsButton");
const checkBoxes = document.querySelectorAll("input[type=checkbox]");
// Views
const tagsView = document.getElementById("tagsView");
const recipeDisplay = document.getElementById("recipeDisplay");
const favRecipesView = document.getElementById("favRecipesView");
const toCookRecipesView = document.getElementById("toCookRecipesView");
const currentRecipeView = document.getElementById("currentRecipeView");
const currentRecipeCard = document.getElementById("currentRecipeCard");

// Event Listeners
allRecipesButton.addEventListener('click', showAllRecipes);
submitNameIng.addEventListener('click', searchByNameIng);
submitTagsButton.addEventListener('click', searchByTags);
homeViewBtn.addEventListener('click', showHomeView);
// recipeDisplay.addEventListener("click", showCurrentRecipe);

// window.addEventListener("load", function() {
//   instantiateRecipes(recipeData)});

// window.addEventListener("load", function() {
//     showHomeView()});
// favoriteButton.addEventListener('click', showFavoriteRecipes);
// addToFavoriteButton.addEventListener('click', );
// toCookButton.addEventListener('click', showRecipesToCook);
// addtoCookButton.addEventListener('click', );


// Functions
function preventDefault() {
  event.preventDefault()
}

function show(element) {
  element.classList.remove('hidden');
}

function hide(element) {
  element.classList.add('hidden');
}

function getRandomRecipe(recipe) {
  return recipe[Math.floor(Math.random() * recipe.length)];
}

function showHomeView() {
  hide(toCookRecipesView);
  hide(favRecipesView);
  hide(currentRecipeView);
  show(recipeDisplay);
  // preventDefault();

  let randomRecipe = getRandomRecipe(recipeRepo.recipes);
  console.log(randomRecipe)
  showRecipes([randomRecipe]);
}

// Show Recipes Function
// Change for iteration methods and be able to use for fav and to cook
//
function showRecipes(recipes) {
  recipeDisplay.innerHTML = "";
  let recipeCard = recipes.forEach(recipe => {
    let recipeCard = document.createElement("div");
    recipeCard.addEventListener("click", showCurrentRecipe)
    recipeCard.innerHTML =
    `
    <h3 id=${recipe.id}>${recipe.name}</h3>
    <img id=${recipe.id} src=${recipe.image}>
    `
    recipeDisplay.appendChild(recipeCard)
  });


  // recipeDisplay.innerHTML = "";
  // for (var i = 0; i < recipes.length; i++) {
  //   //recipes[i];
  //   // console.log(recipes[i]);
  //   let recipeCard = document.createElement("div");
  //   recipeCard.addEventListener("click", showCurrentRecipe)
  //   recipeCard.innerHTML =
  //   `
  //   <h3 id=${recipes[i].id}>${recipes[i].name}</h3>
  //   <img id=${recipes[i].id} src=${recipes[i].image}>
  //   `
  //   recipeDisplay.appendChild(recipeCard)
  // }


  // recipeCardSection.innerHTML = "";
  // let recipeCard = recipes.forEach(recipe => {
  //   recipeCardSection.innerHTML +=
  //   `
  //   <div class="recipe-display" id="recipeDisplay">
  //   <p id=${recipe.id}>${recipe.name}</p>
  //   <img id=${recipe.id} src=${recipe.image}>
  //   </div>
  //   `
  // })
  // <div class="recipe-card-section" id="recipeCardSection">
    // recipeDisplay.appendChild(recipeCardSection)

}

function showAllRecipes() {
  hide(toCookRecipesView);
  hide(favRecipesView);
  hide(currentRecipeView);
  preventDefault();
  show(recipeDisplay);

  console.log(recipeRepo);
  showRecipes(recipeRepo.recipes);
}

function searchByNameIng() {
  hide(toCookRecipesView);
  hide(favRecipesView);
  hide(currentRecipeView);
  preventDefault();
  show(recipeDisplay);
  const test2 = recipeRepo.filterRecipesByName(filterNameIngInput.value);
  showRecipes(test2);
}


function searchByTags() {
  hide(toCookRecipesView);
  hide(favRecipesView);
  hide(currentRecipeView);
  preventDefault();
  show(recipeDisplay);

  let checkBoxMatches = [];
  console.log(checkBoxMatches)
  checkBoxes.forEach(checkBox => {
    if(checkBox.checked) {
      checkBoxMatches.push(checkBox.value)
    }
  })

  const tagMatches = recipeRepo.filterRecipesTags(checkBoxMatches);

  showRecipes(tagMatches)
}

function displayCurrentRecipe(currentRecipe) {
    currentRecipeView.innerHTML = "";

      currentRecipeView.innerHTML =
          `<div class="current-recipe-card" id="currentRecipeCard">
          <section class="current-recipe-name">
            <h2>${currentRecipe.name}</h2>
          </section>
          <section class="current-recipe-add-to-fav">
            <button class="add-favorite-button" id="addToFavoriteButton">Favorite</button>
            <div class="current-recipe-add-to-cook">
              <button class="add-to-cook-button" id="addtoCookButton">Add to Weekly Meals</button>
            </div>
          </section>
          <section class="current-recipe-img">
            <div class="current-recipe-ing">
              <ul>
                <li>${currentRecipe.findIngredientNames(ingredientsData)}</li>
              </ul>
            </div>
            <div class="food-image">
              <img src=${currentRecipe.image}>
            </div>
          </section>
          <section class="current-recipe-text">
            <div class="current-recipe-inst">
              <ol>
                <li>${currentRecipe.retrieveInstructions()}</li>
              </ol>
            </div>
            <div class="current-recipe-tags">
              <ul>
                <li>${currentRecipe.tags}</li>
              </ul>
            </div>
            <div class="current-recipe-cost">
              <p>${currentRecipe.getPriceOfIngredients(ingredientsData)}</p>
            </div>
          </section>
        </div>`
    // currentRecipeView.innerHTML = currentRecipeHTML;
    //currentRecipeView.appendChild(currentRecipeView)
};

function instantiateRecipes(recipeData) {
  // console.log(recipeData);
  recipeData.map(recipe => {
    recipe = new Recipe(recipe.id, recipe.image, recipe.ingredients, recipe.instructions, recipe.name, recipe.tags)
    recipe.createFullIngredients(ingredientsData)
    //console.log(recipe)
    return instantiatedRecipes.push(recipe)
  })
}

function showCurrentRecipe(event) {
  hide(recipeDisplay);
  hide(toCookRecipesView);
  hide(favRecipesView);
  show(currentRecipeView);
  console.log(event.target.id);
  preventDefault();

  let target = event.target.id;
  recipeRepo.recipes.find(recipes => {
    // console.log(recipes.id);
    // console.log(target)
    let numId = recipes.id;
    let stringNum =  numId.toString();
    // let parseNum = num.toString(recipes.id);
    let test1 = (stringNum === target);
    // console.log(test1);
    displayCurrentRecipe(recipes);
    return test1
  });
}

// function showFavoriteRecipes() {
//   show(favRecipesView);
//   hide(toCookRecipesView);
// }
//
// function showRecipesToCook() {
//   show(toCookRecipesView);
//   hide(favRecipesView);
// }




// window.onload = showRecipes(recipeRepo.recipes);
//recipe.createFullIngredients()

//console.log('Hello world');
