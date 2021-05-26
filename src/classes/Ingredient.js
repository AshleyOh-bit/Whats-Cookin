class Ingredient {
  constructor(id, name, cost, quantityObj) {
    this.id = id;
    this.name = name || "";
    this.cost = cost || 0;
  }
}

export default Ingredient;
