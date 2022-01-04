import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Ingredient } from '../ingredient.model';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as IngredientActions from './ingredient-list.actions';
import * as fromApp from '../../store/app.reducer';

@Injectable()
export class IngredientListEffects {
    fetchIngredients = createEffect(() => {
        return this.actions$.pipe(
            ofType(IngredientActions.FETCH_INGREDIENTS),
            switchMap(() => {
                return this.http
                .get<Ingredient[]>(
                    'https://ng-recipe-app-8ece4-default-rtdb.firebaseio.com/ingredients.json'
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
                return this.http
                .put(
                    'https://ng-recipe-app-8ece4-default-rtdb.firebaseio.com/ingredients.json', 
                    ingredientsState.ingredients
                )
            })
        );
    }, {dispatch: false});

    constructor(private actions$: Actions, private http: HttpClient, private store: Store<fromApp.AppState>) {}
}