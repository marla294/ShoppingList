import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { map, switchMap, withLatestFrom } from "rxjs/operators";
import { Ingredient } from "src/app/ingredients/ingredient.model";
import * as fromApp from '../../store/app.reducer';
import * as ShoppingListActions from './shopping-list.actions';
import * as IngredientListActions from '../../ingredients/store/ingredient-list.actions';

@Injectable()
export class ShoppingListEffects { 
    private userSub: Subscription;
    private ingredientsSub: Subscription;

    updateShoppingListIngredients = createEffect(() => {
        return this.actions$.pipe(
            ofType(IngredientListActions.STORE_INGREDIENTS),
            withLatestFrom(this.store.select('shoppingList')),
            map(([actionData, shoppingListState]) => {
                let ingredients: any;

                this.ingredientsSub = this.store.select('ingredients')
                    .pipe(map(ingredientsState => {
                        return ingredientsState.ingredients;
                    }))
                    .subscribe(ings => {
                        ingredients = ings;
                    });

                this.ingredientsSub.unsubscribe();
                let shoppingList = shoppingListState.ingredients.filter(slIng => ingredients.findIndex(ingredient => ingredient.id === slIng.id) > -1);
                
                shoppingList = shoppingList.map(slIng => {
                    let shoppingListIngredient = ingredients.filter(ingredient => ingredient.id === slIng.id)[0];
                    return new Ingredient(
                        shoppingListIngredient.name, 
                        slIng.amount, 
                        shoppingListIngredient.units,
                        shoppingListIngredient.groceryStore,
                        shoppingListIngredient.aisle,
                        shoppingListIngredient.id);
                    
                });

                return new ShoppingListActions.SetIngredients(shoppingList);
            })
        )
    });

    fetchShoppingList = createEffect(() => {
        return this.actions$.pipe(
            ofType(ShoppingListActions.FETCH_SHOPPINGLIST),
            switchMap(() => {
                let userId: any;

                this.userSub = this.store.select('auth')
                    .pipe(map(authState => {
                        return authState.user;
                    }))
                    .subscribe(user => {
                        userId = user.id;
                    });

                this.userSub.unsubscribe();
                return this.http
                .get<Ingredient[]>(
                    `https://ng-recipe-app-8ece4-default-rtdb.firebaseio.com/${userId}-shoppinglist.json`
                )
            }),
            map(ingredients => {
                return new ShoppingListActions.SetIngredients(ingredients);
            })
        );
    });

    storeShoppingList = createEffect(() => {
        return this.actions$.pipe(
            ofType(
                ShoppingListActions.ADD_INGREDIENTS, 
                ShoppingListActions.ADD_INGREDIENT,
                ShoppingListActions.CLEAR_SHOPPINGLIST,
                ShoppingListActions.UPDATE_INGREDIENT,
                ShoppingListActions.DELETE_INGREDIENT,
                ShoppingListActions.STORE_INGREDIENTS,
                ShoppingListActions.SET_INGREDIENTS,
            ),
            withLatestFrom(this.store.select('shoppingList')),
            switchMap(([actionData, shoppingListState]) => {
                let userId: any;

                this.userSub = this.store.select('auth')
                    .pipe(map(authState => {
                        return authState.user;
                    }))
                    .subscribe(user => {
                        userId = user.id;
                    });

                this.userSub.unsubscribe();
                return this.http
                .put(
                    `https://ng-recipe-app-8ece4-default-rtdb.firebaseio.com/${userId}-shoppinglist.json`, 
                    shoppingListState.ingredients
                )
            })
        );
    }, {dispatch: false});

    constructor(private actions$: Actions, private http: HttpClient, private store: Store<fromApp.AppState>) {}
}