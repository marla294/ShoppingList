import { Ingredient } from "../../ingredient.model";

export interface State {
    ingredients: Ingredient[];
}

const initialState: State = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
      ],
};

export function ingredientListReducer(
    state: State = initialState
) {
    return state;
}