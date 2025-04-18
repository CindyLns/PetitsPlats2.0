//Filtres recettes
function filterRecipes() {
    filteredRecipes = [];

    for (let i = 0; i < allRecipes.length; i++) {
        const recipe = allRecipes[i];
        const search = searchElement.toLowerCase();

        if (searchElement.length > 2) {
            let match = false;

            // Vérifie le nom
            if (recipe.name.toLowerCase().includes(search)) {
                match = true;
            }

            // Vérifie la description
            else if (recipe.description.toLowerCase().includes(search)) {
                match = true;
            }

            // Vérifie les ingrédients
            else {
                for (let j = 0; j < recipe.ingredients.length; j++) {
                    const ingredient = recipe.ingredients[j].ingredient.toLowerCase();
                    if (ingredient.includes(search)) {
                        match = true;
                        break;
                    }
                }
            }

            if (match) {
                filteredRecipes.push(recipe);
            }
        } else {
            filteredRecipes.push(recipe);
        }
    }

    if (selectedFilters.length > 0) {
        const tempRecipes = [];

        for (let i = 0; i < filteredRecipes.length; i++) {
            const recipe = filteredRecipes[i];
            let matchesAll = true;

            for (let j = 0; j < selectedFilters.length; j++) {
                const tag = selectedFilters[j];
                let tagMatch = false;

                for (let k = 0; k < recipe.ingredients.length; k++) {
                    if (recipe.ingredients[k].ingredient.toLowerCase() === tag) {
                        tagMatch = true;
                        break;
                    }
                }

                if (!tagMatch && recipe.appliance.toLowerCase() === tag) {
                    tagMatch = true;
                }

                if (!tagMatch) {
                    for (let k = 0; k < recipe.ustensils.length; k++) {
                        if (recipe.ustensils[k].toLowerCase() === tag) {
                            tagMatch = true;
                            break;
                        }
                    }
                }

                if (!tagMatch) {
                    matchesAll = false;
                    break;
                }
            }

            if (matchesAll) {
                tempRecipes.push(recipe);
            }
        }

        filteredRecipes = tempRecipes;
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
