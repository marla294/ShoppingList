import { Action } from '@ngrx/store';
import { Ingredient } from 'src/app/ingredients/ingredient.model';

export const ADD_INGREDIENT = '[Shopping List] Add Ingredient';
export const ADD_INGREDIENTS = '[Shopping List] Add Ingredients';
export const CLEAR_SHOPPINGLIST = '[Shopping List] Clear Shopping List';
export const DELETE_INGREDIENT = '[Shopping List] Delete Ingredient';
export const FETCH_SHOPPINGLIST = '[Shopping List] Fetch Shopping List';
export const UPDATE_INGREDIENT = '[Shopping List] Update Ingredient';
export const SET_INGREDIENTS = '[Shopping List] Set Ingredients';
export const START_EDIT = '[Shopping List] Start Edit';
export const STOP_EDIT = '[Shopping List] Stop Edit';
export const STORE_INGREDIENTS = '[Shopping List] Store Ingredients';

export class AddIngredient implements Action {
    readonly type = ADD_INGREDIENT;

    constructor(public payload: Ingredient) {}
}

export class AddIngredients implements Action {
    readonly type = ADD_INGREDIENTS;

    constructor(public payload: Ingredient[]) {}
}

export class ClearShoppingList implements Action {
    readonly type = CLEAR_SHOPPINGLIST;
}

export class DeleteIngredient implements Action {
    readonly type = DELETE_INGREDIENT;
}

export class FetchShoppingList implements Action {
    readonly type = FETCH_SHOPPINGLIST;
}

export class UpdateIngredient implements Action {
    readonly type = UPDATE_INGREDIENT;

    constructor(public payload: Ingredient) {}
}

export class SetIngredients implements Action {
    readonly type = SET_INGREDIENTS;

    constructor(public payload: Ingredient[]) {}
}

export class StartEdit implements Action { 
    readonly type = START_EDIT;

    constructor(public payload: Ingredient) {}
}

export class StopEdit implements Action { 
    readonly type = STOP_EDIT;
}

export class StoreIngredients implements Action {
    readonly type = STORE_INGREDIENTS;
}

export type ShoppingListActions = AddIngredient 
| AddIngredients 
| ClearShoppingList
| DeleteIngredient
| FetchShoppingList
| UpdateIngredient 
| SetIngredients
| StartEdit
| StopEdit;