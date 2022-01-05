import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { map } from "rxjs/operators";
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipeActions from '../recipes/store/recipe.actions';
import * as IngredientActions from '../ingredients/store/ingredient-list.actions';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
    isAuthenticated = false;
    private userSub: Subscription;

    constructor(
        private store: Store<fromApp.AppState>,
        ) {}

    ngOnInit() {
        this.userSub = this.store.select('auth')
        .pipe(map(authState => {
            return authState.user;
        }))
        .subscribe(user => {
            this.isAuthenticated = !!user;
        });
    }

    onSaveData() {
        this.store.dispatch(new RecipeActions.StoreRecipes());
        this.store.dispatch(new IngredientActions.StoreIngredients());
    }

    onFetchData() {
        this.store.dispatch(new RecipeActions.FetchRecipes());
        this.store.dispatch(new IngredientActions.FetchIngredients());
    }

    onLogout() {
        this.store.dispatch(new AuthActions.Logout());
    }

    ngOnDestroy() {
        this.userSub.unsubscribe();
    }
}