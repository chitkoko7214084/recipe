const recipeListElement = document.getElementById('recipeList');
const recipeDetailsElement = document.getElementById('recipeDetails');

function searchRecipes() {
    const ingredientInput = document.getElementById('ingredientInput').value;

    // Clear previous results
    recipeListElement.innerHTML = '';
    recipeDetailsElement.innerHTML = '';

    // Fetch recipes from The MealDB API
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientInput}`)
        .then(response => response.json())
        .then(data => {
            if (data.meals) {
                displayRecipes(data.meals);
            } else {
                recipeListElement.innerHTML = 'No recipes found.';
            }
        })
        .catch(error => {
            console.error('Error fetching recipes:', error);
            recipeListElement.innerHTML = 'Error fetching recipes.';
        });
}

function displayRecipes(recipes) {
    recipes.forEach(recipe => {
        const { strMeal, strMealThumb, idMeal } = recipe;
        const recipeItem = document.createElement('div');
        recipeItem.classList.add('recipe-item');
        recipeItem.innerHTML = `
            <img src="${strMealThumb}" alt="${strMeal}">
            <p>${strMeal}</p>
            <button onclick="showRecipeDetails('${idMeal}')">View Details</button>
        `;
        recipeListElement.appendChild(recipeItem);
    });
}

function showRecipeDetails(recipeId) {
    // Fetch recipe details from The MealDB API
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`)
        .then(response => response.json())
        .then(data => {
            if (data.meals && data.meals[0]) {
                const { strMeal, strMealThumb, strInstructions, strArea, strCategory } = data.meals[0];
                recipeDetailsElement.innerHTML = `
                    <h2>${strMeal}</h2>
                    <img src="${strMealThumb}" alt="${strMeal}">
                    <p>Category: ${strCategory}</p>
                    <p>Area: ${strArea}</p>
                    <h3>Instructions:</h3>
                    <p>${strInstructions}</p>
                `;
            } else {
                recipeDetailsElement.innerHTML = 'Recipe details not found.';
            }
        })
        .catch(error => {
            console.error('Error fetching recipe details:', error);
            recipeDetailsElement.innerHTML = 'Error fetching recipe details.';

    


        
        });


        
}
window.onload = function () {
    // Find the 'spline-viewer' element
    var splineViewer = document.querySelector('spline-viewer');

    // Check if the 'spline-viewer' element exists
    if (splineViewer) {
        // Access the shadow DOM
        var shadowRoot = splineViewer.shadowRoot;

        // Find the element with id 'logo' and remove it
        var logoElement = shadowRoot.querySelector('#logo');
        if (logoElement) {
            logoElement.remove();
        }
    }
};
