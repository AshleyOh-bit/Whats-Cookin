import './styles.css';
import apiCalls from './apiCalls';

// Import classes
import { ingPromise } from './apiCalls';
import { recPromise } from './apiCalls';
import { userPromise } from './apiCalls';
import  Recipe  from "./classes/Recipe";
import  RecipeRepository  from './classes/RecipeRepository';

let instantiatedRecipes = [];

let recipeRepo, recipeData, ingredientsData


// DOM !!!
// Buttons
const allRecipesButton = document.getElementById("allRecipesButton");

// Submit Buttons
const homeViewBtn = document.getElementById("homeViewBtn");
const filterNameIngInput = document.getElementById("filterNameIngInput");
const submitNameIng = document.getElementById("submitNameIng");
const submitTagsButton = document.getElementById("submitTagsButton");
const checkBoxes = document.querySelectorAll("input[type=checkbox]");
// Views
const recipeDisplay = document.getElementById("recipeDisplay");
const favRecipesView = document.getElementById("favRecipesView");
const toCookRecipesView = document.getElementById("toCookRecipesView");
const currentRecipeView = document.getElementById("currentRecipeView");

// Event Listeners
window.addEventListener("load", getData);
allRecipesButton.addEventListener('click', showAllRecipes);
submitNameIng.addEventListener('click', searchByNameIng);
submitTagsButton.addEventListener('click', searchByTags);
homeViewBtn.addEventListener('click', showHomeView);

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
}

function initalizedData([ingredients, recipes, users]) {
  recipeData = recipes.recipeData;
  ingredientsData = ingredients.ingredientsData
  recipeRepo = new RecipeRepository(instantiatedRecipes, ingredientsData)
  instantiateRecipes(recipeData)
  showHomeView()
}

function getRandomRecipe(recipe) {
  return recipe[Math.floor(Math.random() * recipe.length)];
}

function showHomeView() {
  hide(toCookRecipesView);
  hide(favRecipesView);
  hide(currentRecipeView);
  show(recipeDisplay);

  let randomRecipe = getRandomRecipe(recipeRepo.recipes);
  showRecipes([randomRecipe]);
}

// Show Recipes Function
function showRecipes(recipes) {
  recipeDisplay.innerHTML = "";
  if (recipes === "Sorry, we could not find any recipes to match your search") {
    return recipeDisplay.innerHTML = `<h3>Sorry, we could not find any recipes to match your search</h3>`;
  } else {
    recipes.forEach(recipe => {
      let recipeCard = document.createElement("div");
      recipeCard.addEventListener("click", showCurrentRecipe)
      recipeCard.innerHTML =
      `
      <h3 id=${recipe.id}>${recipe.name}</h3>
      <img id=${recipe.id} src=${recipe.image}>
      `
      recipeDisplay.appendChild(recipeCard)
    })
  }
}

function showAllRecipes() {
  hide(toCookRecipesView);
  hide(favRecipesView);
  hide(currentRecipeView);
  preventDefault();
  show(recipeDisplay);

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
  checkBoxes.forEach(checkBox => {
    if (checkBox.checked) {
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
}


function instantiateRecipes(recipeData) {
  recipeData.map(recipe => {
    recipe = new Recipe(recipe.id, recipe.image, recipe.ingredients, recipe.instructions, recipe.name, recipe.tags)
    recipe.createFullIngredients(ingredientsData)
    return instantiatedRecipes.push(recipe)
  })
}

function showCurrentRecipe(event) {
  hide(recipeDisplay);
  hide(toCookRecipesView);
  hide(favRecipesView);
  show(currentRecipeView);
  preventDefault();

  let target = event.target.id;
  recipeRepo.recipes.find(recipe => {
    let numId = recipe.id;
    let stringNum =  numId.toString();
    let test1 = (stringNum === target);
    displayCurrentRecipe(recipe);
    return test1
  });
}
