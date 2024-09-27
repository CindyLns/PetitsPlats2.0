
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