class Recipe {
  constructor(id, img, ingredients, instructions, name, tags) {
    this.id = id;
    this.image = img;
    this.name = name;
    this.tags = tags;
    this.instructions = instructions;
    this.ingredients = ingredients;
    this.fullIngredients = [];
  }

  createFullIngredients(ingredientsData) {
    this.ingredients.forEach(ingredient => {
      ingredientsData.forEach(namedIng => {
        if(ingredient.id === namedIng.id) {
          this.fullIngredients.push({id: ingredient.id, name: namedIng.name, estimatedCostInCents: namedIng.estimatedCostInCents, quantity: ingredient.quantity})
        }
      })
    })
    return this.fullIngredients
  }

  findIngredientNames(ingData) {
    let ingNames = [];
    this.ingredients.forEach((ing) => {
      let foundIngred = ingData.find(ingred => {
        return ingred.id === ing.id
      })
      ing.name = foundIngred.name;
      ingNames.unshift(ing.name);
    })
    return ingNames;
  }

  findInstructions() {
    return this.instructions;
  }

  getPriceOfIngredients(ingredientsData) {
    let costIng;
    const total = this.ingredients.reduce((accumulator, currentIngredient) => {
      let foundIngred = ingredientsData.find(ingred => {
        return ingred.id === currentIngredient.id
      })
      costIng = Math.floor((currentIngredient.quantity.amount * foundIngred.estimatedCostInCents)) / 100;
      accumulator += costIng
      return accumulator
    }, 0)
    return total
  }

  retrieveInstructions() {
    const newInstructions = [];
    const extractInstructions = this.instructions.forEach(instruction => {
      let num = instruction.number;
      let step = instruction.instruction
      newInstructions.push(num, step)
    })
    return newInstructions;
  }
}

export default Recipe;
