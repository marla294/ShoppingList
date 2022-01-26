import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { map, switchMap, withLatestFrom } from "rxjs/operators";
import * as fromApp from '../../store/app.reducer';
import * as UnitsActions from './units.actions';

@Injectable()
export class UnitsEffects {
    private userSub: Subscription;

    storeUnits = createEffect(() => {
        return this.actions$.pipe(
            ofType(
                UnitsActions.ADD_UNIT,
                UnitsActions.DELETE_UNIT,
                UnitsActions.UPDATE_UNIT
            ),
            withLatestFrom(this.store.select('units')),
            switchMap(([actionData, unitsState]) => {
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
                    `https://ng-recipe-app-8ece4-default-rtdb.firebaseio.com/${userId}-units.json`,
                    unitsState.units
                );
            })
        );
    }, {dispatch: false});

    constructor(private actions$: Actions, private http: HttpClient, private store: Store<fromApp.AppState>) {}
}