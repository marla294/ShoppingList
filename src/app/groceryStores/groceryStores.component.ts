import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import * as fromApp from '../store/app.reducer';
import * as GroceryStoresActions from './store/groceryStores.actions';

@Component({
    selector: 'groceryStores',
    templateUrl: './groceryStores.component.html',
    styleUrls: ['./groceryStores.component.css']
})
export class GroceryStoresComponent implements OnInit, OnDestroy {
    groceryStores: string[];
    groceryStoresSubscription: Subscription;

    constructor(private store: Store<fromApp.AppState>) {}

    ngOnInit() {
        this.groceryStoresSubscription = this.store.select('groceryStores').subscribe(groceryStoresState => {
            this.groceryStores = groceryStoresState.groceryStores;
        });
    }

    onEdit(groceryStore: string) {
        this.store.dispatch(new GroceryStoresActions.StartEdit(groceryStore));
    }

    ngOnDestroy(): void {
        this.groceryStoresSubscription.unsubscribe();
    }
}