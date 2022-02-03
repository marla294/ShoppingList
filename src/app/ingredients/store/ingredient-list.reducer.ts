import { Ingredient } from "../ingredient.model";
import * as IngredientListActions from "./ingredient-list.actions";

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

const ingredientListSort = (a, b) => {
    if (a.name < b.name) {
        return -1;
    }
    if (a.name > b.name) {
        return 1;
    }
    return 0;
};

const setIngredientsIds = (ingredients: Ingredient[]) => {
    return ingredients.map((ingredient) => {
        if (ingredient && !ingredient.id) {
            return {
                ...ingredient,
                id: (new Date()).getTime().toString()
            }
        }
        else {
            return { ...ingredient }
        }
    });
}

export function ingredientListReducer(
    state: State = initialState,
    action: IngredientListActions.IngredientListActions
) {
    switch (action.type) {
        case IngredientListActions.ADD_INGREDIENT:
            let ingFind = state.ingredients.filter(ing => ing.name.toLowerCase().trim() === action.payload.name.toLowerCase().trim());
            if (ingFind.length === 0) {
                let ingredients = [...state.ingredients, action.payload];
                const ingredientsSorted = ingredients.sort(ingredientListSort);
                return {
                    ...state,
                    ingredients: [...setIngredientsIds([...ingredientsSorted])]
                };
            }
            else {
                return state;
            }
        case IngredientListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...setIngredientsIds([...state.ingredients, ...action.payload])]
            };
        case IngredientListActions.UPDATE_INGREDIENT:
            const ingredient = state.ingredients[state.editedIngredientIndex]
            const updatedIngredient = {
                ...ingredient,
                ...action.payload
            };
            const updatedIngredients = [...state.ingredients];
            updatedIngredients[state.editedIngredientIndex] = updatedIngredient;

            const updatedIngredientsSorted = updatedIngredients.sort(ingredientListSort);

            return {
                ...state,
                ingredients: [...setIngredientsIds([...updatedIngredientsSorted])],
                editedIngredientIndex: -1,
                editedIngredient: null
            };
        case IngredientListActions.DELETE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.filter((ig, igIndex) => {
                    return igIndex !== state.editedIngredientIndex;
                })
            };
        case IngredientListActions.SET_INGREDIENTS:
            if (action.payload) {
                return {
                    ...state,
                    ingredients: [...setIngredientsIds([...action.payload])]
                };
            }
            else {
                return {
                    ...state,
                    ingredients: []
                };
            }
        case IngredientListActions.START_EDIT:
            return {
                ...state,
                editedIngredientIndex: action.payload,
                editedIngredient: {...state.ingredients[action.payload]}
            };
        case IngredientListActions.STOP_EDIT:
            return {
                ...state,
                editedIngredient: null,
                editedIngredientIndex: -1
            };
        default:
            return state;
    }
}