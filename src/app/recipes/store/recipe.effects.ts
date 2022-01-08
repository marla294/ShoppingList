import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Recipe } from '../recipe.model';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as RecipesActions from './recipe.actions';
import * as fromApp from '../../store/app.reducer';
import { Subscription } from 'rxjs';

@Injectable()
export class RecipeEffects {
    private userSub: Subscription;

    fetchRecipes = createEffect(() => {
        return this.actions$.pipe(
            ofType(RecipesActions.FETCH_RECIPES),
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
                .get<Recipe[]>(
                    `https://ng-recipe-app-8ece4-default-rtdb.firebaseio.com/${userId}-recipes.json`
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
                    `https://ng-recipe-app-8ece4-default-rtdb.firebaseio.com/${userId}-recipes.json`, 
                    recipesState.recipes
                )
            })
        );
    }, {dispatch: false});

    constructor(private actions$: Actions, private http: HttpClient, private store: Store<fromApp.AppState>) {}
}