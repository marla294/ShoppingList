import { Recipe } from "../recipe.model";
import * as RecipesActions from './recipe.actions';

export interface State {
    recipes: Recipe[]
}

const initialState: State = {
    recipes: []
};

export function recipeReducer(state = initialState, action: RecipesActions.RecipesActions) {
    switch (action.type) {
        case RecipesActions.SET_RECIPES:
            if (action.payload) {
                return {
                    ...state,
                    recipes: [...action.payload]
                };
            }
            else {
                return null;
            }
        case RecipesActions.ADD_RECIPE:
            if (action.payload) {
                if (state.recipes !== null) {
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
        case RecipesActions.UPDATE_RECIPE:
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
        case RecipesActions.DELETE_RECIPE:
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