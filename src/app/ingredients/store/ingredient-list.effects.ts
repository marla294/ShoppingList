import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Ingredient } from '../ingredient.model';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as IngredientActions from './ingredient-list.actions';
import * as fromApp from '../../store/app.reducer';
import { Subscription } from 'rxjs';

@Injectable()
export class IngredientListEffects {
    private userSub: Subscription;

    fetchIngredients = createEffect(() => {
        return this.actions$.pipe(
            ofType(IngredientActions.FETCH_INGREDIENTS),
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
                    `https://ng-recipe-app-8ece4-default-rtdb.firebaseio.com/${userId}-ingredients.json`
                )
            }),
            map(ingredients => {
                return new IngredientActions.SetIngredients(ingredients);
            })
        );
    });

    storeIngredients = createEffect(() => {
        return this.actions$.pipe(
            ofType(IngredientActions.STORE_INGREDIENTS),
            withLatestFrom(this.store.select('ingredients')),
            switchMap(([actionData, ingredientsState]) => {
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
                    `https://ng-recipe-app-8ece4-default-rtdb.firebaseio.com/${userId}-ingredients.json`, 
                    ingredientsState.ingredients
                )
            })
        );
    }, {dispatch: false});

    constructor(private actions$: Actions, private http: HttpClient, private store: Store<fromApp.AppState>) {}
}