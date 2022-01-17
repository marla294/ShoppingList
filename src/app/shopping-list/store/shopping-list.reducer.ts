import { Ingredient } from "../../ingredients/ingredient.model";
import * as ShoppingListActions from './shopping-list.actions';

export interface State {
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientIndex: number;
}

const initialState: State = {
    ingredients: [],
    editedIngredient: null,
    editedIngredientIndex: -1,
};

const shoppingListSort = (a, b) => {
    if (a.name < b.name) {
        return -1;
    }
    if (a.name > b.name) {
        return 1;
    }
    return 0;
};

export function shoppingListReducer(
    state: State = initialState, 
    action: ShoppingListActions.ShoppingListActions) {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            let ingredients = [...state.ingredients, action.payload];
            const ingredientsSorted = ingredients.sort(shoppingListSort);

            return {
                ...state,
                ingredients: ingredientsSorted
            };
        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            };
        case ShoppingListActions.DELETE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.filter((ig, igIndex) => {
                    return igIndex !== state.editedIngredientIndex;
                })
            };
        case ShoppingListActions.UPDATE_INGREDIENT:
            const ingredient = state.ingredients[state.editedIngredientIndex]
            const updatedIngredient = {
                ...ingredient,
                ...action.payload
            };
            const updatedIngredients = [...state.ingredients];
            updatedIngredients[state.editedIngredientIndex] = updatedIngredient;
            const updatedIngredientsSorted = updatedIngredients.sort(shoppingListSort);

            return {
                ...state,
                ingredients: updatedIngredientsSorted,
                editedIngredientIndex: -1,
                editedIngredient: null
            };
        case ShoppingListActions.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: [...action.payload]
            };
        case ShoppingListActions.START_EDIT:
            const editedIngredientIndex = state.ingredients.findIndex(ingredient => {
                return ingredient === action.payload;
            });

            return {
                ...state,
                editedIngredientIndex: editedIngredientIndex,
                editedIngredient: {...state.ingredients[editedIngredientIndex]}
            };
        case ShoppingListActions.STOP_EDIT:
            return {
                ...state,
                editedIngredient: null,
                editedIngredientIndex: -1
            };
        default:
            return state;
    }
}