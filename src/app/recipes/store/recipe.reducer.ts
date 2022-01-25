import { Recipe } from "../recipe.model";
import * as RecipeActions from './recipe.actions';

export interface State {
    recipes: Recipe[]
}

const initialState: State = {
    recipes: []
};

export function recipeReducer(
    state: State = initialState, 
    action: RecipeActions.RecipeActions) {
    switch (action.type) {
        case RecipeActions.SET_RECIPES:
            if (action.payload) {
                return {
                    ...state,
                    recipes: [...action.payload]
                };
            }
            else {
                return null;
            }
        case RecipeActions.ADD_RECIPE:
            if (action.payload) {
                if (state && state.recipes !== null) {
                    return {
                        ...state,
                        recipes: [...state.recipes, action.payload]
                    };
                }
                else {
                    return {
                        ...state,
                        recipes: [action.payload]
                    };
                }
            }
            else {
                return null;
            }
        case RecipeActions.UPDATE_RECIPE:
            const updatedRecipe = {
                ...state.recipes[action.payload.index],
                ...action.payload.newRecipe
            };

            const updatedRecipes = [...state.recipes];
            updatedRecipes[action.payload.index] = updatedRecipe;

            return {
                ...state,
                recipes: updatedRecipes
            };
        case RecipeActions.DELETE_RECIPE:
            return {
                ...state,
                recipes: state.recipes.filter((recipe, index) => {
                    return index !== action.payload;
                })
            };
        default:
            return state;
    }
}