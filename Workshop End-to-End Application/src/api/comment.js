import { endPoints, addOwner } from './data.js';
import * as api from './api.js';
import { createPointer } from './data.js';


export function getCommentsByRecipeId(recipeId){
    return api.get(endPoints.commentsByRecipe(recipeId));
}

export function createComment(recipeId, comment){
    comment.recipe = createPointer('Recipe', recipeId);
    addOwner(comment);
    return api.post(endPoints.comments, comment);
}