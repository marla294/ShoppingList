import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { map, switchMap, withLatestFrom } from "rxjs/operators";
import * as fromApp from '../../store/app.reducer';
import * as GroceryStoresActions from './groceryStores.actions';

@Injectable()
export class GroceryStoresEffects {
    private userSub: Subscription;

    fetchGroceryStores = createEffect(() => {
        return this.actions$.pipe(
            ofType(
                GroceryStoresActions.FETCH_GROCERYSTORES
            ),
            switchMap(() => {
                let userId: any;

                this.userSub = this.store.select('auth')
                    .pipe(map(authState => {
                        return authState.user
                    })).subscribe(user => {
                        userId = user.id;
                    });

                this.userSub.unsubscribe();

                return this.http
                .get<string[]>(
                    `https://ng-recipe-app-8ece4-default-rtdb.firebaseio.com/${userId}-groceryStores.json`
                );
            }),
            map(groceryStores => {
                return new GroceryStoresActions.SetGroceryStores(groceryStores);
            })
        );
    });

    storeGroceryStores = createEffect(() => {
        return this.actions$.pipe(
            ofType(
                GroceryStoresActions.ADD_GROCERYSTORE,
                GroceryStoresActions.DELETE_GROCERYSTORE,
                GroceryStoresActions.UPDATE_GROCERYSTORE,
            ),
            withLatestFrom(this.store.select('groceryStores')),
            switchMap(([actionData, groceryStoresState]) => {
                let userId: any;

                this.userSub = this.store.select('auth')
                    .pipe(map(authState => {
                        return authState.user
                    })).subscribe(user => {
                        userId = user.id;
                    });

                this.userSub.unsubscribe();

                return this.http
                .put(
                    `https://ng-recipe-app-8ece4-default-rtdb.firebaseio.com/${userId}-groceryStores.json`, 
                    groceryStoresState.groceryStores
                )
            })
        );
    }, {dispatch: false});

    constructor(private actions$: Actions, private http: HttpClient, private store: Store<fromApp.AppState>) {}
}