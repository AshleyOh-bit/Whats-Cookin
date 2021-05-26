import { expect } from 'chai';
import  Recipe  from "../src/classes/Recipe";
import  testIngredientsData  from './test-data';

describe("Recipe", () => {
  let recipe;

  beforeEach(() => {
    recipe = new Recipe(51, "https://www.pumpkinnspice.com/wp-content/uploads/2020/08/creamy-macaroni-cheese-4.jpg", [{
      "id": 35,
      "quantity": {
        "amount": 2,
        "unit": "c"
      }
    },
    {
      "id": 77,
      "quantity": {
        "amount": 9,
        "unit": "oz"
      }
    },
    {
      "id": 21,
      "quantity": {
        "amount": 1.5,
        "unit": "cup"
      }
    },
    {
      "id": 18,
      "quantity": {
        "amount": 0.5,
        "unit": "lb"
      }}],
    [{ "instruction": "Salt the water then boil", "number": 1},
      {"instruction": "Pour the dry noodles into the pot", "number": 2},
      {"instruction": "Boil noodles for 8 minutes", "number": 3},
      {"instruction": "Make a roux with flour and butter", "number": 4},
      {"instruction": "Add cheese to roux", "number": 5},
      {"instruction": "Add cheesy roux to noodles and mix", "number": 6}],
    "Macaroni and Cheese", ["comfort food", "dinner"]
    )
  })

  it('should be a function', () => {

    expect(Recipe).to.be.a('function');
  });

  it('should be an instance of Recipe', () => {

    expect(recipe).to.be.an.instanceof(Recipe);
  });

  it('should be stored with an id number', () => {

    expect(recipe.id).to.equal(51);
  });

  it('should store an image of the recipe', () => {

    expect(recipe.image).to.equal("https://www.pumpkinnspice.com/wp-content/uploads/2020/08/creamy-macaroni-cheese-4.jpg");
  });

  it('should store the name of the recipe', () => {

    expect(recipe.name).to.equal("Macaroni and Cheese");
  });

  it('should store related tags from the recipe', () => {

    expect(recipe.tags).to.deep.equal(["comfort food", "dinner"]);
  });

  it('should store instructions to prepare the recipe', () => {

    expect(recipe.instructions).to.deep.equal([{ "instruction": "Salt the water then boil", "number": 1},
      {"instruction": "Pour the dry noodles into the pot", "number": 2},
      {"instruction": "Boil noodles for 8 minutes", "number": 3},
      {"instruction": "Make a roux with flour and butter", "number": 4},
      {"instruction": "Add cheese to roux", "number": 5},
      {"instruction": "Add cheesy roux to noodles and mix", "number": 6}]);
  });

  it('should store all the required ingredients for the recipe', () => {

    expect(recipe.ingredients).to.deep.equal([{"id": 35, "quantity": {"amount": 2, "unit": "c"}},
      {"id": 77, "quantity": {"amount": 9, "unit": "oz"}}, {"id": 21, "quantity": {"amount": 1.5, "unit": "cup"}}, {"id": 18, "quantity": {"amount": 0.5, "unit": "lb"}}])
  });

  it('should store full ingredients data for the recipe', () => {

    recipe.createFullIngredients(testIngredientsData);

    expect(recipe.fullIngredients).to.deep.equal([
      {
        "id": 35,
        "name": "flour",
        "estimatedCostInCents": 324,
        "quantity": {
          "amount": 2,
          "unit": "c"
        }
      },

      {
        "id": 77,
        "name": "butter",
        "estimatedCostInCents": 203,
        "quantity": {
          "amount": 9,
          "unit": "oz"
        }
      },
      {
        "id": 21,
        "name": "cheddar cheese",
        "estimatedCostInCents": 430,
        "quantity": {
          "amount": 1.5,
          "unit": "cup"
        }
      },
      {
        "id": 18,
        "name": "pasta",
        "estimatedCostInCents": 150,
        "quantity": {
          "amount": 0.5,
          "unit": "lb"
        }
      }
    ])
  });

  it("should be able to determine the names of ingredients needed", () => {
    recipe.findIngredientNames(testIngredientsData);

    expect(recipe.findIngredientNames(testIngredientsData)).to.deep.equal(["pasta", "cheddar cheese", "butter", "flour"]);
  });

  it("should update ingredient names", () => {
    recipe.findIngredientNames(testIngredientsData);

    expect(recipe.ingredients[0].name).to.equal("flour");
    expect(recipe.ingredients[1].name).to.equal("butter");
    expect(recipe.ingredients[2].name).to.equal("cheddar cheese");
    expect(recipe.ingredients[3].name).to.equal("pasta");
  });

  it("should calculate total estimated cost in cents of ingredients", () => {
    recipe.getPriceOfIngredients(testIngredientsData);

    expect(recipe.getPriceOfIngredients(testIngredientsData)).to.equal(31.95)
  });

  it("should return the instructions needed to cook recipe", () => {
    recipe.retrieveInstructions();

    expect(recipe.retrieveInstructions()).to.deep.equal([1, 'Salt the water then boil', 2, 'Pour the dry noodles into the pot', 3, 'Boil noodles for 8 minutes', 4, 'Make a roux with flour and butter', 5, 'Add cheese to roux', 6, 'Add cheesy roux to noodles and mix']);
  });
});
