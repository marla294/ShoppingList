import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import * as fromRecipes from '../recipes/store/recipe.reducer';
import * as fromIngredients from '../ingredients/store/ingredient-list.reducer';
import * as fromUnits from '../units/store/units.reducer'
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    shoppingList: fromShoppingList.State;
    auth: fromAuth.State;
    recipes: fromRecipes.State;
    ingredients: fromIngredients.State;
    units: fromUnits.State;
}

export const appReducer: ActionReducerMap<AppState> = {
    shoppingList: fromShoppingList.shoppingListReducer,
    auth: fromAuth.authReducer,
    recipes: fromRecipes.recipeReducer,
    ingredients: fromIngredients.ingredientListReducer,
    units: fromUnits.unitsReducer,
};