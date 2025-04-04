//Barre principale de recherche
function filterRecipes(searchElement) {
    if(searchElement.length > 2){
        filteredRecipes = allRecipes.filter(recipe => 
            recipe.name.toLowerCase().includes(searchElement.toLowerCase()) || 
            recipe.description.toLowerCase().includes(searchElement.toLowerCase()) || 
            recipe.ingredients.some(ing => ing.ingredient.toLowerCase().includes(searchElement.toLowerCase()))
        );
    }
    displayData(filteredRecipes);
    const totalRecipes = showTotalRecipe(filteredRecipes);
    displayTotalRecipes(totalRecipes);

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

function filterRecipesByTags() {
    if (selectedFilters.length === 0) {
        // Si aucun tag n'est sélectionné, afficher toutes les recettes
        filteredRecipes = allRecipes;
    } else {
        // Filtrer les recettes pour qu'elles contiennent tous les ingrédients sélectionnés
        filteredRecipes = allRecipes.filter(recipe =>
            selectedFilters.every(tag =>
                recipe.ingredients.some(ingredientObj =>
                    ingredientObj.ingredient.toLowerCase() === tag
                )||
                recipe.appliance.toLowerCase() === tag
                ||
                recipe.ustensils.some(ustensil =>
                    ustensil.toLowerCase() === tag
                )
            )
        );
    }
    displayData(filteredRecipes);
    const totalRecipes = showTotalRecipe(filteredRecipes);
    displayTotalRecipes(totalRecipes);
}
