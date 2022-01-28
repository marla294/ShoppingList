import { Action } from "@ngrx/store";

export const ADD_GROCERYSTORE = '[Grocery Stores] Add Grocery Store';
export const START_EDIT = '[Grocery Stores] Start Edit';
export const STOP_EDIT = '[Grocery Stores] Stop Edit';
export const UPDATE_GROCERYSTORE = '[Grocery Stores] Update Grocery Store';

export class AddGroceryStore implements Action {
    readonly type = ADD_GROCERYSTORE;

    constructor(public payload: string) {}
}

export class StartEdit implements Action {
    readonly type = START_EDIT;

    constructor(public payload: string) {}
}

export class StopEdit implements Action {
    readonly type = STOP_EDIT;
}

export class UpdateGroceryStore implements Action {
    readonly type = UPDATE_GROCERYSTORE;

    constructor(public payload: string) {}
}

export type GroceryStoresActions = AddGroceryStore
| StartEdit
| StopEdit
| UpdateGroceryStore;