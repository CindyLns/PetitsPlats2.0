async function getRecipes() {
    const reponse = await fetch("recipes.json");
    const data = await reponse.json()

   
    return data;
}

let allRecipes = [];
let filteredRecipes = [];
let allIngredient = [];
let filteredIngredient = [];

function recipesTemplate(recipe) {
    const { image, name, time, description, ingredients } = recipe;

    const recettesSection = document.getElementById("sectionRecettes");

    const recettesArticle = document.createElement('article');
    recettesArticle.classList.add('card_recipe', 'bg-white', 'rounded-3xl', 'w-full', 'relative','md:w-[48%]', 'lg:w-[30%]');


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

// Ajouter la recette au conteneur de recettes
recettesSection.appendChild(recettesArticle);
}

async function displayData(recipes) {
    const recettesSection = document.getElementById("sectionRecettes");
    recettesSection.innerHTML = ''; 
    recipes.forEach((recipe) => {
        recipesTemplate(recipe); 
    });

}

function showIngredients(ingredients) {
    const ingredientFiltre = document.querySelector(".ingredient_filtre");
    ingredientFiltre.innerHTML = ''; 

    let allIngredients = new Set(); // Utiliser un Set pour éviter les doublons
    // Parcourir chaque recette pour récupérer les ingrédients
    ingredients.forEach(ingredient => {
        console.log(ingredient)
        ingredient.ingredients.forEach(ingredientObj => {
            allIngredients.add(ingredientObj.ingredient.toLowerCase()); // Ajouter l'ingrédient au Set
        });
    });
    // Ajouter chaque ingrédient au conteneur
    allIngredients.forEach(ingredient => {
        const ingredientName = document.createElement('p');
        ingredientName.classList.add('text-sm', 'mb-3');
        ingredientName.textContent = ingredient;
        ingredientFiltre.appendChild(ingredientName);
    });
    return [allIngredients]; 
}

function showAppliance(recipes) {
    const applianceFiltre = document.querySelector(".appareil_filtre");
    applianceFiltre.innerHTML = ''; 

    let allAppliances = new Set(); 

    // Parcourir chaque recette pour récupérer les appareils
    recipes.forEach(recipe => {
        allAppliances.add(recipe.appliance.toLowerCase());
    });

    // Ajouter chaque appareil au conteneur
    allAppliances.forEach(appliance => {
        const applianceName = document.createElement('p');
        applianceName.classList.add('text-sm', 'mb-3');
        applianceName.textContent = appliance;
        applianceFiltre.appendChild(applianceName);
    });
}

function showUstensil(recipes) {
    const ustensilFiltre = document.querySelector(".ustensile_filtre");
    ustensilFiltre.innerHTML = ''; 

    let allUstensils = new Set(); 

     // Parcourir chaque recette pour récupérer les ustensiles
     recipes.forEach(recipe => {
        recipe.ustensils.forEach(ustensil => {
            allUstensils.add(ustensil.toLowerCase());
        });
    });

    // Ajouter chaque ustensile au conteneur
    allUstensils.forEach(ustensils => {
        const ustensilName = document.createElement('p');
        ustensilName.classList.add('text-sm', 'mb-3');
        ustensilName.textContent = ustensils;
        ustensilFiltre.appendChild(ustensilName);
    });
}


const searchBar = document.querySelector('.search_input');
searchBar.addEventListener("keyup", (e) => {
    const searchElement = e.target.value;
    filterIngredients(searchElement)

});

function showTotalRecipe(allRecipes) {
    return allRecipes.length; 
}

//Affiche le nombre total de recettes
function displayTotalRecipes(totalrecipes) {
    const totalRecettes = document.querySelector(".total_recettes");
    totalRecettes.innerText = `${totalrecipes} recettes`;
}

//Barre de recherche filtre
const searchBarIngredients = document.querySelector('.search_filter-ingredients');
searchBarIngredients.addEventListener("keyup", (e) => {
    const searchIngredients = e.target.value;
    console.log(searchIngredients);
    filterIngredients(searchIngredients)

});

//Gère l'affichage du menu déroulant
const dropdownFiltres = document.querySelectorAll(".dropdownFiltre");

dropdownFiltres.forEach((dropdown) => {
    // Sélectionne les éléments spécifiques à chaque dropdown
    const chevron = dropdown.querySelector(".chevron-dropdown");
    const searchForm = dropdown.querySelector(".search_form");
    const filtreContent = dropdown.querySelector(".ingredient_filtre") || dropdown.querySelector(".appareil_filtre") || dropdown.querySelector(".ustensile_filtre");

    dropdown.addEventListener("click", function (e) {
        e.stopPropagation();

        // Toggle l'affichage des éléments du filtre
        searchForm.classList.toggle('hidden');  
        filtreContent.classList.toggle('hidden');
        chevron.classList.toggle('rotate-180'); 

        [searchForm, filtreContent].forEach(element => {
            element.addEventListener("click", (e) => {
                e.stopPropagation();
            });
        });
    });
});

async function init() {
    const { recipes } = await getRecipes();
    allRecipes = recipes; 
    filteredRecipes = allRecipes; 
    displayData(allRecipes);
    const totalrecipes = showTotalRecipe(allRecipes);
    displayTotalRecipes(totalrecipes);

    showIngredients(allRecipes);
    showAppliance(allRecipes);
    showUstensil(allRecipes)
}

init();