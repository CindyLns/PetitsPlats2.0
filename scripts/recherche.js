//Filtres recettes
function filterRecipes() {
    filteredRecipes = allRecipes;

    if(searchElement.length > 2){
        filteredRecipes = filteredRecipes.filter(recipe => 
            recipe.name.toLowerCase().includes(searchElement.toLowerCase()) || 
            recipe.description.toLowerCase().includes(searchElement.toLowerCase()) || 
            recipe.ingredients.some(ing => ing.ingredient.toLowerCase().includes(searchElement.toLowerCase()))
        );
    }
    if (selectedFilters.length > 0) {
        filteredRecipes = filteredRecipes.filter(recipe =>
            selectedFilters.every(tag =>
                recipe.ingredients.some(ing => ing.ingredient.toLowerCase() === tag) ||
                recipe.appliance.toLowerCase() === tag ||
                recipe.ustensils.some(ust => ust.toLowerCase() === tag)
            )
        );
    }
    displayData(filteredRecipes);
    const totalRecipes = showTotalRecipe(filteredRecipes);
    displayTotalRecipes(totalRecipes);
    displayAlertMessage(filteredRecipes.length === 0);
    updateFiltersFromFilteredRecipes();
}

//Message aucune recette correspondante à la recherche
function displayAlertMessage(displayNoRecipeFound) {
    const alertMessage = document.querySelector('.alert-message');
    const searchRecipe = document.getElementById("searchRecipe");
    const inputValue = document.querySelector('.search_input').value;
  
    if (displayNoRecipeFound === true) {
        alertMessage.style.display = 'block';
        searchRecipe.textContent = inputValue;
    } else {
        alertMessage.style.display = 'none';
      // Réinitialisez le terme de recherche si des correspondances ont été trouvées
        searchRecipe.textContent = '';
    }
  }


//Filtres de recherche

function filterIngredients(searchIngredients) {
        filteredIngredient = [...allIngredients].filter(ingredient => 
            ingredient.toLowerCase().includes(searchIngredients.toLowerCase())
        );
    showIngredients(filteredIngredient);
}

function filterAppliance(searchAppliance) {
    filteredAppliance = [...allAppliances].filter(appliance => 
        appliance.toLowerCase().includes(searchAppliance.toLowerCase())
    );
    showAppliance(filteredAppliance);
}

function filterUstensil(searchUstensil) {
    filteredUstensil = [...allUstensils].filter(ustensil => 
        ustensil.toLowerCase().includes(searchUstensil.toLowerCase())
    );
    showUstensil(filteredUstensil);
}

//Mise à jour des filtres
function updateFiltersFromFilteredRecipes() {
    const newIngredients = new Set();
    const newAppliances = new Set();
    const newUstensils = new Set();

    filteredRecipes.forEach(recipe => {
        recipe.ingredients.forEach(ing => newIngredients.add(ing.ingredient.toLowerCase()));
        newAppliances.add(recipe.appliance.toLowerCase());
        recipe.ustensils.forEach(ust => newUstensils.add(ust.toLowerCase()));
    });

    showIngredients([...newIngredients]);
    showAppliance([...newAppliances]);
    showUstensil([...newUstensils]); 
}
