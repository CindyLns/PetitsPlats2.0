async function getRecipes() {
    const reponse = await fetch("recipes.json");
    const data = await reponse.json()

   
    return data;
}

function recipesTemplate(recipe) {
    const { image, name, time, description, ingredients } = recipe;

    const recettesSection = document.getElementById("sectionRecettes");

    const recettesArticle = document.createElement('article');
    recettesArticle.classList.add('bg-white', 'rounded-3xl', 'w-[30%]', 'relative');


    // Créer l'élément image
    const imageElement = document.createElement('img');
    imageElement.src = `assets/images/${image}`;
    imageElement.alt = name;
    imageElement.classList.add('w-full', 'h-[16rem]', 'object-cover', 'rounded-t-3xl');
    recettesArticle.appendChild(imageElement);

    // Créer et ajouter le nom de la recette
    const recipeName = document.createElement('h2');
    recipeName.textContent = name;
    recipeName.classList.add('px-6', 'py-8', 'font-title', 'text-lg')
    recettesArticle.appendChild(recipeName);

    // Créer et ajouter le temps de la recette
    const timeDiv = document.createElement('div');
    timeDiv.classList.add('bg-[#FFD15B]', 'py-1', 'px-4', 'rounded-2xl', 'absolute', 'top-5', 'right-5');
    const recipeTime = document.createElement('p');
    recipeTime.textContent = `${time} min`;
    recettesArticle.appendChild(timeDiv);
    timeDiv.appendChild(recipeTime);

    const detailRecipe = document.createElement('div');
    detailRecipe.classList.add('px-6', 'pb-14', 'flex', 'flex-col', 'gap-8');
    recettesArticle.appendChild(detailRecipe);

    const topContainer = document.createElement('div');
    detailRecipe.appendChild(topContainer);

    const titleRecipe = document.createElement('h3');
    titleRecipe.textContent = `recette`;
    titleRecipe.classList.add('text-xs', 'font-bold', 'text-[#7A7A7A]', 'uppercase', 'mb-4');
    topContainer.appendChild(titleRecipe);

    // Créer et ajouter la description de la recette
    const recipeDescription = document.createElement('p');
    recipeDescription.textContent = description;
    topContainer.appendChild(recipeDescription);

    const bottomContainer = document.createElement('div');
    detailRecipe.appendChild(bottomContainer);

    const titleIngredient = document.createElement('h3');
    titleIngredient.textContent = `ingrédients`;
    titleIngredient.classList.add('text-xs', 'font-bold', 'text-[#7A7A7A]', 'uppercase', 'mb-4');
    bottomContainer.appendChild(titleIngredient)

    // Créer le conteneur pour les ingrédients
    const ingredientsContainer = document.createElement('div');
    ingredientsContainer.classList.add('flex', 'flex-wrap', 'gap-y-5');
    bottomContainer.appendChild(ingredientsContainer);

    // Ajouter les ingrédients
   // Vérifiez que 'ingredients' est un tableau avant d'utiliser forEach
   if (Array.isArray(ingredients)) {
    // Ajouter les ingrédients
    ingredients.forEach(ingredientObj => {
        const { ingredient, quantity, unit } = ingredientObj;

        const ingredientDiv = document.createElement('div');
        ingredientDiv.classList.add('w-1/2');

        const ingredientName = document.createElement('p');
        ingredientName.classList.add('font-medium');
        ingredientName.textContent = ingredient;

        const ingredientQuantity = document.createElement('span');
        ingredientQuantity.classList.add('text-[#7A7A7A]');
        ingredientQuantity.textContent = quantity ? `${quantity} ${unit || ''}` : '';

        ingredientDiv.appendChild(ingredientName);
        ingredientDiv.appendChild(ingredientQuantity);

        ingredientsContainer.appendChild(ingredientDiv);
    });
} else {
    // Gérer le cas où 'ingredients' n'est pas défini ou n'est pas un tableau
    const noIngredientsMessage = document.createElement('p');
    noIngredientsMessage.textContent = 'Ingrédients non disponibles';
    ingredientsContainer.appendChild(noIngredientsMessage);
}

// Ajouter la recette au conteneur de recettes
recettesSection.appendChild(recettesArticle);
}

async function displayData(recipes) {
    recipes.forEach((recipe) => {
        recipesTemplate(recipe); 
    });
}

async function init() {
    const { recipes } = await getRecipes();
    displayData(recipes);
}

init();