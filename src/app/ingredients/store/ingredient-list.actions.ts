import { Action } from "@ngrx/store";
import { Ingredient } from "../ingredient.model";

export const ADD_INGREDIENT = '[Ingredient List] Add Ingredient';
export const ADD_INGREDIENTS = '[Ingredient List] Add Ingredients';
export const UPDATE_INGREDIENT = '[Ingredient List] Update Ingredient';
export const DELETE_INGREDIENT = '[Ingredient List] Delete Ingredient';
export const START_EDIT = '[Ingredient List] Start Edit';
export const STOP_EDIT = '[Ingredient List] Stop Edit';

export class AddIngredient implements Action {
    readonly type = ADD_INGREDIENT;

    constructor(public payload: Ingredient) {}
}

export class AddIngredients implements Action {
    readonly type = ADD_INGREDIENTS;

    constructor(public payload: Ingredient[]) {}
}

export class UpdateIngredient implements Action {
    readonly type = UPDATE_INGREDIENT;

    constructor(public payload: Ingredient) {}
}

export class DeleteIngredient implements Action {
    readonly type = DELETE_INGREDIENT;
}

export class StartEdit implements Action { 
    readonly type = START_EDIT;

    constructor(public payload: number) {}
}

export class StopEdit implements Action { 
    readonly type = STOP_EDIT;
}

export type IngredientListActions = AddIngredient
| AddIngredients 
| UpdateIngredient 
| DeleteIngredient
| StartEdit
| StopEdit;