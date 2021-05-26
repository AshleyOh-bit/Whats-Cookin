import { expect } from 'chai';
import Ingredient  from '../src/classes/Ingredient';

describe("Ingredient", () => {
  let ingredient;

  beforeEach(() => {
    ingredient = new Ingredient(582, "clementine", 203, {"quantity": {
      "amount": .25,
      "unit": "lb"
    }});
  })

  it('should be a function', () => {

    expect(Ingredient).to.be.a('function');
  });

  it('should be an instance of Ingredient', () => {

    expect(ingredient).to.be.an.instanceof(Ingredient);
  });

  it('should be stored with an id number', () => {

    expect(ingredient.id).to.equal(582);
  });

  it('should store the name of the ingredient', () => {

    expect(ingredient.name).to.equal("clementine");
  });

  it('should store the cost of the ingredient', () => {

    expect(ingredient.cost).to.equal(203);
  });
});
