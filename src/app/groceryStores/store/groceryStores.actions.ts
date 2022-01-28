import { Action } from "@ngrx/store";

export const ADD_GROCERYSTORE = '[Grocery Stores] Add Grocery Store';
export const DELETE_GROCERYSTORE = '[Grocery Stores] Delete Grocery Store';
export const FETCH_GROCERYSTORES = '[Grocery Stores] Fetch Grocery Stores';
export const SET_GROCERYSTORES = '[Grocery Stores] Set Grocery Stores';
export const START_EDIT = '[Grocery Stores] Start Edit';
export const STOP_EDIT = '[Grocery Stores] Stop Edit';
export const UPDATE_GROCERYSTORE = '[Grocery Stores] Update Grocery Store';

export class AddGroceryStore implements Action {
    readonly type = ADD_GROCERYSTORE;

    constructor(public payload: string) {}
}

export class DeleteGroceryStore implements Action {
    readonly type = DELETE_GROCERYSTORE;
}

export class FetchGroceryStores implements Action {
    readonly type = FETCH_GROCERYSTORES;
}

export class SetGroceryStores implements Action {
    readonly type = SET_GROCERYSTORES;

    constructor(public payload: string[]) {}
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
| DeleteGroceryStore
| FetchGroceryStores
| SetGroceryStores
| StartEdit
| StopEdit
| UpdateGroceryStore;