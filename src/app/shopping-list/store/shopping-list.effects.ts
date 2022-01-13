import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { map, switchMap, withLatestFrom } from "rxjs/operators";
import * as fromApp from '../../store/app.reducer';
import * as ShoppingListActions from './shopping-list.actions';

@Injectable()
export class ShoppingListEffects { 
    private userSub: Subscription;

    storeShoppingList = createEffect(() => {
        return this.actions$.pipe(
            ofType(
                ShoppingListActions.ADD_INGREDIENTS, 
                ShoppingListActions.ADD_INGREDIENT,
                ShoppingListActions.UPDATE_INGREDIENT,
                ShoppingListActions.DELETE_INGREDIENT
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