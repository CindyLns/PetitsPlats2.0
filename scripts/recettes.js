async function getRecipes() {
    const reponse = await fetch("recipes.json");
    const data = await reponse.json()

   
    return data;
}

let allRecipes = [];
let filteredRecipes = [];
let allIngredients = new Set();
let filteredIngredient = [];
let allAppliances = new Set();
let filteredAppliance = [];
let allUstensils = new Set();
let filteredUstensil = [];
let searchElement = [];
let selectedFilters = [];

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

    // Ajouter chaque ingrédient au conteneur
    ingredients.forEach(ingredient => {
        const ingredientName = document.createElement('p');
        ingredientName.classList.add('text-sm', 'mb-3');
        ingredientName.textContent = ingredient;

        // Ajouter un event listener pour ajouter l'ingrédient cliqué dans "tags"
        ingredientName.addEventListener('click', () => addTag(ingredient));

        ingredientFiltre.appendChild(ingredientName);
    });
    return [allIngredients]; 
}

function listIngredient () {
    allRecipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredientObj => {
            allIngredients.add(ingredientObj.ingredient.toLowerCase()); // Ajouter l'ingrédient au Set
        });
    });
}

function addTag(ingredient) {
    const tagsContainer = document.getElementById("tags");
    if (!selectedFilters.includes(ingredient)) {
        selectedFilters.push(ingredient); // Ajouter l'ingrédient dans les tags sélectionnés

        const tag = document.createElement('span');
        tag.classList.add('bg-[#FFD15B]', 'inline-flex', 'items-center', 'py-[17px]', 'px-[18px]', 'rounded-[10px]', 'gap-14', 'text-sm'); 
        tag.textContent = ingredient;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'x';
        removeBtn.classList.add('text-lg', 'font-bold');
        removeBtn.onclick = () => {
            tagsContainer.removeChild(tag);
            selectedFilters = selectedFilters.filter(item => item !== ingredient); // Supprimer le tag de la sélection
            filterRecipes(); // Mettre à jour l'affichage des recettes
        };

        tag.appendChild(removeBtn);
        tagsContainer.appendChild(tag);

        filterRecipes(); // Mettre à jour l'affichage des recettes

        closeDropdownOnTagAdd();
    }
}

function showAppliance(appliances) {
    const applianceFiltre = document.querySelector(".appareil_filtre");
    applianceFiltre.innerHTML = ''; 

    // Ajouter chaque appareil au conteneur
    appliances.forEach(appliance => {
        const applianceName = document.createElement('p');
        applianceName.classList.add('text-sm', 'mb-3');
        applianceName.textContent = appliance;
        applianceName.addEventListener('click', () => addTagApp(appliance));
        applianceFiltre.appendChild(applianceName);
    });
}

function listAppliance () {
    allRecipes.forEach(recipe => {
        allAppliances.add(recipe.appliance.toLowerCase());
    });
}

function addTagApp(appliance) {
    const tagsContainer = document.getElementById("tags");
    if (!selectedFilters.includes(appliance)) {
        selectedFilters.push(appliance); // Ajouter l'ingrédient dans les tags sélectionnés

        const tag = document.createElement('span');
        tag.classList.add('bg-[#FFD15B]', 'inline-flex', 'items-center', 'py-[17px]', 'px-[18px]', 'rounded-[10px]', 'gap-14', 'text-sm'); 
        tag.textContent = appliance;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'x';
        removeBtn.classList.add('text-lg', 'font-bold');
        removeBtn.onclick = () => {
            tagsContainer.removeChild(tag);
            selectedFilters = selectedFilters.filter(item => item !== appliance); // Supprimer le tag de la sélection
            filterRecipes(); // Mettre à jour l'affichage des recettes
        };

        tag.appendChild(removeBtn);
        tagsContainer.appendChild(tag);

        filterRecipes(); // Mettre à jour l'affichage des recettes

        closeDropdownOnTagAdd();
    }
}

function showUstensil(ustensils) {
    const ustensilFiltre = document.querySelector(".ustensile_filtre");
    ustensilFiltre.innerHTML = ''; 

    // Ajouter chaque ustensile au conteneur
    ustensils.forEach(ustensil => {
        const ustensilName = document.createElement('p');
        ustensilName.classList.add('text-sm', 'mb-3');
        ustensilName.textContent = ustensil;
        ustensilName.addEventListener('click', () => addTagUs(ustensil));
        ustensilFiltre.appendChild(ustensilName);
    });
}

function listUstensil () {
    allRecipes.forEach(recipe => {
        recipe.ustensils.forEach(ustensil => {
            allUstensils.add(ustensil.toLowerCase());
        });
    });
}

function addTagUs(ustensil) {
    const tagsContainer = document.getElementById("tags");
    if (!selectedFilters.includes(ustensil)) {
        selectedFilters.push(ustensil); // Ajouter l'ingrédient dans les tags sélectionnés

        const tag = document.createElement('span');
        tag.classList.add('bg-[#FFD15B]', 'inline-flex', 'items-center', 'py-[17px]', 'px-[18px]', 'rounded-[10px]', 'gap-14', 'text-sm'); 
        tag.textContent = ustensil;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'x';
        removeBtn.classList.add('text-lg', 'font-bold');
        removeBtn.onclick = () => {
            tagsContainer.removeChild(tag);
            selectedFilters = selectedFilters.filter(item => item !== ustensil); // Supprimer le tag de la sélection
            filterRecipes(); // Mettre à jour l'affichage des recettes
        };

        tag.appendChild(removeBtn);
        tagsContainer.appendChild(tag);

        filterRecipes(); // Mettre à jour l'affichage des recettes

        closeDropdownOnTagAdd();
    }
}

const searchBar = document.querySelector('.search_input');
searchBar.addEventListener("keyup", (e) => {
    searchElement = e.target.value;
    filterRecipes();

});

function showTotalRecipe(allRecipes) {
    return allRecipes.length; 
}

//Affiche le nombre total de recettes
function displayTotalRecipes(totalrecipes) {
    const totalRecettes = document.querySelector(".total_recettes");
    totalRecettes.innerText = `${totalrecipes} recettes`;
}

//Barre de recherche filtres
const searchBarIngredients = document.querySelector('.search_filter-ingredients');
searchBarIngredients.addEventListener("keyup", (e) => {
    const searchIngredients = e.target.value;
    filterIngredients(searchIngredients)

});

const searchBarAppliances = document.querySelector('.search_filter-appliance');
searchBarAppliances.addEventListener("keyup", (e) => {
    const searchAppliance = e.target.value;
    filterAppliance(searchAppliance)

});

const searchBarUstensils = document.querySelector('.search_filter-ustensil');
searchBarUstensils.addEventListener("keyup", (e) => {
    const searchUstensil = e.target.value;
    filterUstensil(searchUstensil)

});

//Gère l'affichage du menu déroulant
const dropdownFiltres = document.querySelectorAll(".dropdownFiltre");

dropdownFiltres.forEach((dropdown, index) => {
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

        closeOtherDropdowns(index);
    });

        [searchForm, filtreContent].forEach(element => {
            element.addEventListener("click", (e) => {
                e.stopPropagation();
            });
        });
});

function closeOtherDropdowns(currentIndex) {
    dropdownFiltres.forEach((dropdown, index) => {
        if (index !== currentIndex) {
            const chevron = dropdown.querySelector(".chevron-dropdown");
            const searchForm = dropdown.querySelector(".search_form");
            const filtreContent = dropdown.querySelector(".ingredient_filtre") || 
                                  dropdown.querySelector(".appareil_filtre") || 
                                  dropdown.querySelector(".ustensile_filtre");

            // S'assure que les autres dropdowns sont fermés
            searchForm.classList.add('hidden');
            filtreContent.classList.add('hidden');
            chevron.classList.remove('rotate-180');
        }
    });
}

function closeDropdownOnTagAdd() {
    dropdownFiltres.forEach((dropdown) => {
        const chevron = dropdown.querySelector(".chevron-dropdown");
        const searchForm = dropdown.querySelector(".search_form");
        const filtreContent = dropdown.querySelector(".ingredient_filtre") || 
                              dropdown.querySelector(".appareil_filtre") || 
                              dropdown.querySelector(".ustensile_filtre");

        // Ferme les éléments actifs
        searchForm.classList.add('hidden');
        filtreContent.classList.add('hidden');
        chevron.classList.remove('rotate-180');
    });
}

async function init() {
    const { recipes } = await getRecipes();
    allRecipes = recipes; 
    filteredRecipes = allRecipes; 
    displayData(allRecipes);
    const totalrecipes = showTotalRecipe(allRecipes);
    displayTotalRecipes(totalrecipes);

    listIngredient();
    listAppliance();
    listUstensil();
    showIngredients(allIngredients);
    showAppliance(allAppliances);
    showUstensil(allUstensils)
}

init();