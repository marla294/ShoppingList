import * as GroceryStoresActions from './groceryStores.actions';

export interface State {
    groceryStores: string[];
    editedGroceryStore: string;
    editedGroceryStoreIndex: number;
};

const initialState: State = {
    groceryStores: [
        "Amazon",
        "HyVee",
        "Family Fare",
        "Whole Foods",
    ],
    editedGroceryStore: null,
    editedGroceryStoreIndex: -1,
};

const groceryStoreSort = (a, b) => {
    if (a < b) {
        return -1;
    }
    if (a > b) {
        return 1;
    }
    return 0;
};

export function groceryStoresReducer(
    state: State = initialState,
    action: GroceryStoresActions.GroceryStoresActions
) {
    switch (action.type) {
        case GroceryStoresActions.ADD_GROCERYSTORE:
            return {
                ...state,
                groceryStores: [...state.groceryStores, action.payload].sort(groceryStoreSort),
            };
        case GroceryStoresActions.DELETE_GROCERYSTORE:
            return {
                ...state,
                groceryStores: [...state.groceryStores].filter(groceryStore => groceryStore !== state.editedGroceryStore),
                editedGroceryStore: null,
                editedGroceryStoreIndex: -1
            };
        case GroceryStoresActions.START_EDIT:
            let groceryStoreIndex = state.groceryStores.findIndex(groceryStore => groceryStore === action.payload);

            return {
                ...state,
                editedGroceryStore: action.payload,
                editedGroceryStoreIndex: groceryStoreIndex,
            };
        case GroceryStoresActions.STOP_EDIT:
            return {
                ...state,
                editedGroceryStore: null,
                editedGroceryStoreIndex: -1,
            };
        case GroceryStoresActions.UPDATE_GROCERYSTORE:
            let editedGroceryStores = [...state.groceryStores];
            editedGroceryStores[state.editedGroceryStoreIndex] = action.payload;

            return {
                ...state,
                groceryStores: editedGroceryStores.sort(groceryStoreSort),
            };
        default:
            return state;
    }
}