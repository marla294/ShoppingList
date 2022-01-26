import { Action } from '@ngrx/store';

export const ADD_UNIT = '[Units] Add Unit';
export const START_EDIT = '[Units] Start Edit';
export const STOP_EDIT = '[Units] Stop Edit';

export class AddUnit implements Action {
    readonly type = ADD_UNIT;

    constructor(public payload: string) {}
}

export class StartEdit implements Action {
    readonly type = START_EDIT;

    constructor(public payload: string) {}
}

export class StopEdit implements Action {
    readonly type = STOP_EDIT;
}

export type UnitsActions = AddUnit
| StartEdit
| StopEdit;