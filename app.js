const ingredientForm = document.getElementById('ingredient-form');
const ingredientInput = document.getElementById('ingredient-input');
const ingredientList = document.getElementById('ingredient-list');
const generateMenuButton = document.getElementById('generate-menu');
const menuSuggestions = document.getElementById('menu-suggestions');
const menuList = document.getElementById('menu-list');

let ingredients = [];

// Agregar ingredientes a la lista
document.getElementById('add-ingredient').addEventListener('click', () => {
  const ingredient = ingredientInput.value.trim();
  if (ingredient) {
    ingredients.push(ingredient);
    const li = document.createElement('li');
    li.textContent = ingredient;
    ingredientList.appendChild(li);
    ingredientInput.value = '';
  }
});

// Generar menú basado en los ingredientes
generateMenuButton.addEventListener('click', () => {
  const possibleMenus = getPossibleMenus(ingredients);
  menuList.innerHTML = '';

  if (possibleMenus.length > 0) {
    possibleMenus.forEach(menu => {
      const li = document.createElement('li');
      li.textContent = menu;
      menuList.appendChild(li);
    });
    menuSuggestions.style.display = 'block';
  } else {
    const li = document.createElement('li');
    li.textContent = 'No se encontraron recetas con los ingredientes disponibles.';
    menuList.appendChild(li);
    menuSuggestions.style.display = 'block';
  }
});

// Función que devuelve recetas posibles basadas en los ingredientes
function getPossibleMenus(ingredients) {
  const recipes = [
    { name: 'Ensalada de frutas', requiredIngredients: ['manzana', 'banana', 'naranja'] },
    { name: 'Omelette', requiredIngredients: ['huevo', 'queso', 'jamón'] },
    { name: 'Sándwich', requiredIngredients: ['pan', 'jamón', 'queso', 'lechuga'] },
    { name: 'Pasta al pesto', requiredIngredients: ['pasta', 'albahaca', 'ajo', 'aceite'] },
  ];

  return recipes
    .filter(recipe =>
      recipe.requiredIngredients.every(ingredient => ingredients.includes(ingredient))
    )
    .map(recipe => recipe.name);
}
