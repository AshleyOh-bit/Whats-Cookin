// Your fetch requests will live here!
class ApiHost {
  constructor() {
    this.httpUrl = 'http://localhost:3001/api/v1/'
  }
  getUsers() {
    fetch(`${this.httpUrl}users`)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log('error'));
  }
  getIngredients() {
  fetch(`${this.httpUrl}ingredients`)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(err => console.log('error'));
  }
  getRecipes() {
  fetch(`${this.httpUrl}recipes`)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(err => console.log('error'));
  }
}

export default ApiHost;
