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
