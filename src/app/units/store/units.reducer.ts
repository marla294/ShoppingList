import * as UnitsActions from './units.actions';

export interface State {
    units: string[];
    editedUnit: string;
    editedUnitIndex: number;
}

const initialState: State = {
    units: [],
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
            };
        case UnitsActions.DELETE_UNIT:
            return {
                ...state,
                units: [...state.units].filter((unit, index) => index !== state.editedUnitIndex),
                editedUnit: null,
                editedUnitIndex: -1
            };
        case UnitsActions.START_EDIT:
            const editedUnitIndex = state.units.findIndex(unit => unit === action.payload);

            return {
                ...state,
                editedUnit: state.units[editedUnitIndex],
                editedUnitIndex: editedUnitIndex
            };
        case UnitsActions.STOP_EDIT:
            return {
                ...state,
                editedUnit: null,
                editedUnitIndex: -1
            };
        case UnitsActions.UPDATE_UNIT:
            const updatedUnits = [...state.units];
            updatedUnits[state.editedUnitIndex] = action.payload;

            return {
                ...state,
                units: updatedUnits
            };
        default:
            return state;
    }
}