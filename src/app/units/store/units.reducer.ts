import * as UnitsActions from './units.actions';

export interface State {
    units: string[];
    editedUnit: string;
    editedUnitIndex: number;
}

const initialState: State = {
    units: ["test"],
    editedUnit: null,
    editedUnitIndex: -1,
};

export function unitsReducer(
    state: State = initialState, 
    action: UnitsActions.UnitsActions
) {
    switch (action.type) {
        case UnitsActions.ADD_UNIT:
            return {
                ...state,
                units: [...state.units, action.payload]
            }
    }
}