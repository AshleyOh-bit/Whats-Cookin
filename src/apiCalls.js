// Your fetch requests will live here!

export const ingPromise = () =>{
  return fetch('http://localhost:3001/api/v1/ingredients')
  .then(response => response.json())
}

export const recPromise = () =>{
  return fetch('http://localhost:3001/api/v1/recipes')
  .then(response => response.json())
}

export const userPromise = () =>{
  return fetch('http://localhost:3001/api/v1/users')
  .then(response => response.json())
}


// class ApiHost {
//   constructor() {
//     this.httpUrl = 'http://localhost:3001/api/v1/'
//   }
//   getUsers() {
//     fetch(`${this.httpUrl}users`)
//     .then(response => response.json())
//     .then(data => console.log(data))
//     .catch(err => console.log('error'));
//   }
//   getIngredients() {
//   fetch(`${this.httpUrl}ingredients`)
//   .then(response => response.json())
//   .then(data => console.log(data))
//   .catch(err => console.log('error'));
//   }
//   getRecipes() {
//   fetch(`${this.httpUrl}recipes`)
//   .then(response => response.json())
//   .then(data => console.log(data))
//   .catch(err => console.log('error'));
//   }
// }
// console.log('I will be a fetch request!')
//
// export default ApiHost;
