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

