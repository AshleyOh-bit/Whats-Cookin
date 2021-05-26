import { expect } from 'chai';
import  User  from "../src/classes/User";
import  Recipe  from '../src/classes/Recipe';
import  testIngredientsData  from './test-data';

describe("User", () => {
  let user, recipe, recipe1;
  beforeEach(() => {
    user = new User(55, "Sally HungryPerson", [{"ingredient": 1124, "amount": 3}, {"ingredient": 1127, "amount": 2}, {"ingredient": 14, "amount": 7}]);
    recipe = new Recipe(51, "https://www.pumpkinnspice.com/wp-content/uploads/2020/08/creamy-macaroni-cheese-4.jpg", [{"id": 18, "quantity": {"amount": 2, "unit": "c"}}, {"id": 8, "quantity": {"amount": 9, "unit": "oz"}}, {"id": 11, "quantity": { "amount": 1.5, "unit": "cup"}}, {"id": 225, "quantity": {"amount": 0.5, "unit": "lb"}}],
      [{ "instruction": "Salt the water then boil", "number": 1},
        {"instruction": "Pour the dry noodles into the pot", "number": 2},
        {"instruction": "Boil noodles for 8 minutes", "number": 3},
        {"instruction": "Make a roux with flour and butter", "number": 4},
        {"instruction": "Add cheese to roux", "number": 5},
        {"instruction": "Add cheesy roux to noodles and mix", "number": 6}],
      "Macaroni and Cheese", ["comfort food", "dinner"]);

    recipe1 = new Recipe(32, "https://www.spendwithpennies.com/wp-content/uploads/2021/04/Fried-Eggs-SpendWithPennies-4.jpg", [{"id": 2, "quantity": {"amount": 2, "unit": "small"}}, {"id": 77, "quantity": {"amount": 2, "unit": "tbs"}}], [{ "instruction": "Melt butter in pan", "number": 1},
      {"instruction": "Crack the eggs in the pan", "number": 2},
      {"instruction": "Flip eggs once and cook to desired firmness", "number": 3}], "Fried Eggs in Butter", ["breakfast", "protein"]);
  })

  it('should be a function', () => {

    expect(User).to.be.a('function');
  });

  it('should be an instance of User', () => {

    expect(user).to.be.an.instanceof(User);
  });

  it('should be stored with an id number', () => {

    expect(user.id).to.equal(55);
  });

  it('should store the name of the user', () => {

    expect(user.name).to.equal("Sally HungryPerson");
  });

  it('should store related ingredients', () => {

    expect(user.pantry).to.deep.equal([{"ingredient": 1124, "amount": 3}, {"ingredient": 1127, "amount": 2}, {"ingredient": 14, "amount": 7}]);
  });

  //Happy
  it('should be able to store favorites recipes', () => {
    user.addToFavoriteRecipes(recipe);
    user.addToFavoriteRecipes(recipe1);

    expect(user.favoriteRecipes).to.deep.equal([recipe, recipe1]);
  });

  //Sad
  it('should prevent the user from favoriting the same recipe twice', () => {
    user.favoriteRecipes = [recipe];
    user.addToFavoriteRecipes(recipe);

    expect(user.favoriteRecipes).to.deep.equal([recipe]);
  });

  it('should be able to remove a recipe from favorite recipes', () => {
    user.favoriteRecipes = [recipe];
    user.removeFromFavoriteRecipes(recipe);

    expect(user.favoriteRecipes).to.deep.equal([]);
  });

  //Happy
  it('should be able to add a recipe to weekly recipes', () => {
    user.addToRecipesToCook(recipe);
    user.addToRecipesToCook(recipe1);

    expect(user.recipesToCook).to.deep.equal([recipe, recipe1]);
  });

  //Sad
  it('should prevent the user from saving the same recipe twice', () => {
    user.favoriteRecipes = [recipe];
    user.addToRecipesToCook(recipe);

    expect(user.recipesToCook).to.deep.equal([recipe]);
  });

  //Happy
  it('should filter favorite recipes via tags', () => {
    user.addToFavoriteRecipes(recipe);
    user.addToFavoriteRecipes(recipe1);
    user.filterFavRecipesTags(["dinner"]);

    expect(user.filterFavRecipesTags(["dinner"])).to.deep.equal([recipe]);
  });

  //Sad
  it('should alert user when no recipe with that tag is found', () => {
    user.addToFavoriteRecipes(recipe);
    user.addToFavoriteRecipes(recipe1);
    user.filterFavRecipesTags(["tea"]);

    expect(user.filterFavRecipesTags(["tea"])).to.equal("Sorry, we could not find any recipes with that tag");
  });

  //Happy
  it('should filter favorite recipes via name or ingredients', () => {
    user.addToFavoriteRecipes(recipe);
    user.addToFavoriteRecipes(recipe1);
    user.filterFavRecipesByName("Macaroni and Cheese", testIngredientsData);

    expect(user.filterFavRecipesByName("Macaroni and Cheese", testIngredientsData)).to.deep.equal([recipe]);
  });

  //Sad
  it('should alert the user when no recipe with that name is found', () => {
    user.addToFavoriteRecipes(recipe);
    user.addToFavoriteRecipes(recipe1);
    user.filterFavRecipesByName("Crab legs", testIngredientsData);

    expect(user.filterFavRecipesByIngredients("Crab legs", testIngredientsData)).to.equal("Sorry, we could not find any recipes to match your search");
  });

  //Happy
  it('should filter favorite recipes via name or ingredients', () => {
    user.addToFavoriteRecipes(recipe);
    user.addToFavoriteRecipes(recipe1);
    user.filterFavRecipesByName("pasta", testIngredientsData);

    expect(user.filterFavRecipesByIngredients("pasta", testIngredientsData)).to.deep.equal([recipe]);
  });

  //Sad
  it('should alert the user if no recipe with specified ingredients are found', () => {
    user.addToFavoriteRecipes(recipe);
    user.addToFavoriteRecipes(recipe1);
    user.filterFavRecipesByName("milk", testIngredientsData);

    expect(user.filterFavRecipesByIngredients("milk", testIngredientsData)).to.equal("Sorry, we could not find any recipes to match your search");
  });
});
