import { endPoints, addOwner } from './data.js';
import * as api from './api.js';


export async function getRecipes(){
    return api.get(endPoints.recipes);
}

export async function getRecipeById(id){
    return api.get(endPoints.recipeDetails(id));
}

export async function createRecipe(recipe){
    addOwner(recipe);

    return api.post(endPoints.recipes, recipe);
}

export async function updateRecipe(id, recipe){
    return api.put(endPoints.recipeById + id, recipe);
}

export async function deleteRecipe(id){
    return api.del(endPoints.recipeById + id);
}