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

const consolidateShoppingList = (ingredient: Ingredient, list: Ingredient[]) => {
    const matchingIngredients = list.filter(ing => ing.name === ingredient.name);

    debugger;

    if (matchingIngredients.length > 1) {
        list = list.filter(ing => ing.name !== ingredient.name);

        let totalAmount: number = 0;

        matchingIngredients.forEach(ing => {
            totalAmount += +ing.amount;
        });

        let updatedIngredient = {
            ...ingredient,
            amount: totalAmount
        };

        list.push(updatedIngredient);
    }

    return list;
};

export function shoppingListReducer(
    state: State = initialState, 
    action: ShoppingListActions.ShoppingListActions) {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: consolidateShoppingList(action.payload, [...state.ingredients, action.payload]).sort(shoppingListSort)
            };

        case ShoppingListActions.ADD_INGREDIENTS:
            let updatedAddIngredients: Ingredient[] = [...state.ingredients];
            action.payload.forEach(ingredient => {
                updatedAddIngredients = consolidateShoppingList(ingredient, [...updatedAddIngredients, ingredient]);
            });

            return {
                ...state,
                ingredients: updatedAddIngredients.sort(shoppingListSort)
            };
        case ShoppingListActions.CLEAR_SHOPPINGLIST:
            return { 
                ...state,
                ingredients: [],
                editedIngredientIndex: -1,
                editedIngredient: null
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
            let updatedIngredients = [...state.ingredients];
            updatedIngredients[state.editedIngredientIndex] = updatedIngredient;

            updatedIngredients = consolidateShoppingList(action.payload, updatedIngredients);

            const updatedIngredientsSorted = updatedIngredients.sort(shoppingListSort);

            return {
                ...state,
                ingredients: updatedIngredientsSorted,
                editedIngredientIndex: -1,
                editedIngredient: null
            };
        case ShoppingListActions.SET_INGREDIENTS:
            debugger;
            let setIngredients = [];

            if (action.payload) {
                setIngredients = [...action.payload];
            }

            return {
                ...state,
                ingredients: setIngredients
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