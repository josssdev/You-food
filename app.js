const ingredientInput = document.getElementById('ingredient-input');
const ingredientList = document.getElementById('ingredient-list');
const generateMenuButton = document.getElementById('generate-menu');
const loadingMessage = document.getElementById('loading-message');
const menuSuggestions = document.getElementById('menu-suggestions');
const menuOutput = document.getElementById('menu-output');

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

// Función para generar recetas usando la API de OpenAI
async function generateMenuWithAI(ingredients) {
  const apiKey = 'sk-svcacct-e3a7DR4ayBRk6emguvNUd8Io2IUC5aGzbr2CqWyqLJPnuJ-YdafMjWj6Z_EWkXeT3BlbkFJuCdOU16v7UkMt92rUNk4gKaVvDLFcc08nHmxvWvlIWC7IdltA7BAIVsSO9zpYUwA';  // Asegúrate de reemplazar esto por tu clave API

  const prompt = `Con los siguientes ingredientes: ${ingredients.join(', ')}, sugiéreme una receta creativa que pueda hacer.`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo', // Puedes cambiar esto a 'gpt-4' si tienes acceso
        messages: [
          {"role": "system", "content": "Eres un chef creativo que sugiere recetas basadas en ingredientes."},
          {"role": "user", "content": prompt}
        ],
        max_tokens: 150
      })
    });

    if (!response.ok) {
      throw new Error(`Error de la API: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error al conectarse a la API:', error);
    throw error;
  }
}

// Generar menú basado en IA
generateMenuButton.addEventListener('click', async () => {
  if (ingredients.length === 0) {
    alert('Por favor, ingresa al menos un ingrediente.');
    return;
  }

  // Mostrar mensaje de carga
  loadingMessage.style.display = 'block';

  try {
    const menu = await generateMenuWithAI(ingredients);
    menuOutput.textContent = menu;
    menuSuggestions.style.display = 'block';
  } catch (error) {
    menuOutput.textContent = 'Ocurrió un error al generar el menú. Por favor, inténtalo nuevamente.';
  }

  // Ocultar mensaje de carga
  loadingMessage.style.display = 'none';
});
