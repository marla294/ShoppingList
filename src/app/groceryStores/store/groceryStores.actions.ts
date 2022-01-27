import { Action } from "@ngrx/store";

export const ADD_GROCERYSTORE = '[Grocery Stores] Add Grocery Store';

export class AddGroceryStore implements Action {
    readonly type = ADD_GROCERYSTORE;

    constructor(public payload: string) {}
}

export type GroceryStoresActions = AddGroceryStore;