import { Action } from "@ngrx/store";
import { Ingredient } from "../../ingredient.model";

export const ADD_INGREDIENT = '[Ingredient List] Add Ingredient';

export class AddIngredient implements Action {
    readonly type = ADD_INGREDIENT;

    constructor(public payload: Ingredient) {}
}

export type IngredientListActions = AddIngredient;