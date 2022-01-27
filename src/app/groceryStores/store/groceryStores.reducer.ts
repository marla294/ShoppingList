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

export function groceryStoresReducer(
    state: State = initialState,
    action: GroceryStoresActions.GroceryStoresActions
) {
    switch (action.type) {
        case GroceryStoresActions.ADD_GROCERYSTORE:
            return {
                ...state,
                groceryStores: [...state.groceryStores, action.payload]
            }
        default:
            return state;
    }
}