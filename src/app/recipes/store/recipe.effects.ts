import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Recipe } from '../recipe.model';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as RecipesActions from './recipe.actions';
import * as fromApp from '../../store/app.reducer';

@Injectable()
export class RecipeEffects {
    fetchRecipes = createEffect(() => {
        return this.actions$.pipe(
            ofType(RecipesActions.FETCH_RECIPES),
            switchMap(() => {
                return this.http
                .get<Recipe[]>(
                    'https://ng-recipe-app-8ece4-default-rtdb.firebaseio.com/recipes.json'
                )
            }),
            map(recipes => {
                if (recipes) {
                    return recipes.map(recipe => {
                        return {
                            ...recipe, 
                            ingredients: recipe.ingredients ? recipe.ingredients : []
                        };
                    });
                }
                else {
                    return null;
                }
            }),
            map(recipes => {
                return new RecipesActions.SetRecipes(recipes);
            })
        );
    });

    storeRecipes = createEffect(() => {
        return this.actions$.pipe(
            ofType(RecipesActions.STORE_RECIPES),
            withLatestFrom(this.store.select('recipes')),
            switchMap(([actionData, recipesState]) => {
                return this.http
                .put(
                    'https://ng-recipe-app-8ece4-default-rtdb.firebaseio.com/recipes.json', 
                    recipesState.recipes
                )
            })
        );
    }, {dispatch: false});

    constructor(private actions$: Actions, private http: HttpClient, private store: Store<fromApp.AppState>) {}
}