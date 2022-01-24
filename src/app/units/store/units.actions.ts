import { Action } from '@ngrx/store';

export const ADD_UNIT = '[Units] Add Unit';

export class AddUnit implements Action {
    readonly type = ADD_UNIT;

    constructor(public payload: string) {}
}

export type UnitsActions = AddUnit;