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
    if (searchIngredients.length > 2) {
        // Filtrer les ingrédients correspondant à la recherche dans les recettes
        filteredRecipes = allRecipes.filter(recipe =>
            recipe.ingredients.some(ing => 
                ing.ingredient.toLowerCase().includes(searchIngredients.toLowerCase())
            )
        );
        
        // Mettre à jour la liste des ingrédients à partir des recettes filtrées
        filteredIngredient = showIngredients(filteredIngredient);
    }

    console.log(filteredIngredient);
    // Afficher les ingrédients filtrés
    
}



