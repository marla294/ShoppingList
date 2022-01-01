import { Ingredient } from "../ingredient.model";
import * as IngredientListActions from "./ingredient-list.actions";

export interface State {
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientIndex: number;
}

const initialState: State = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
      ],
      editedIngredient: null,
      editedIngredientIndex: -1,
};

export function ingredientListReducer(
    state: State = initialState,
    action: IngredientListActions.IngredientListActions
) {
    switch (action.type) {
        case IngredientListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
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