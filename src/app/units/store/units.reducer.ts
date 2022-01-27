import * as UnitsActions from './units.actions';

export interface State {
    units: string[];
    editedUnit: string;
    editedUnitIndex: number;
};

const initialState: State = {
    units: [
        "bottle(s)",
        "box",
        "can(s)",
        "dozen",
        "each",
        "jar(s)",
        "gallon(s)",
        "lb(s)",
        "link(s)",
        "oz",
        "pack",
        "pint",
        "tbsp",
        "tsp",
    ],
    editedUnit: null,
    editedUnitIndex: -1,
};

const unitsSort = (a, b) => {
    if (a < b) {
        return -1;
    }
    if (a > b) {
        return 1;
    }
    return 0;
};

export function unitsReducer(
    state: State = initialState, 
    action: UnitsActions.UnitsActions
) {
    switch (action.type) {
        case UnitsActions.ADD_UNIT:
            return {
                ...state,
                units: [...state.units, action.payload].sort(unitsSort)
            };
        case UnitsActions.DELETE_UNIT:
            return {
                ...state,
                units: [...state.units].filter((unit, index) => index !== state.editedUnitIndex),
                editedUnit: null,
                editedUnitIndex: -1
            };
        case UnitsActions.SET_UNITS:
            let setUnits = state.units;

            if (action.payload) {
                setUnits = [...action.payload];
            }

            return {
                ...state,
                units: setUnits.sort(unitsSort)
            }
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
                units: updatedUnits.sort(unitsSort)
            };
        default:
            return state;
    }
}