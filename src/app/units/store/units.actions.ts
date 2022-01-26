import { Action } from '@ngrx/store';

export const ADD_UNIT = '[Units] Add Unit';
export const DELETE_UNIT = '[Units] Delete Unit';
export const START_EDIT = '[Units] Start Edit';
export const STOP_EDIT = '[Units] Stop Edit';
export const UPDATE_UNIT = '[Units] Update Unit';

export class AddUnit implements Action {
    readonly type = ADD_UNIT;

    constructor(public payload: string) {}
}

export class DeleteUnit implements Action {
    readonly type = DELETE_UNIT;
}

export class StartEdit implements Action {
    readonly type = START_EDIT;

    constructor(public payload: string) {}
}

export class StopEdit implements Action {
    readonly type = STOP_EDIT;
}

export class UpdateUnit implements Action {
    readonly type = UPDATE_UNIT;

    constructor(public payload: string) {}
}

export type UnitsActions = AddUnit
| DeleteUnit
| StartEdit
| StopEdit
| UpdateUnit;