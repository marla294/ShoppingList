import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import * as fromApp from '../../store/app.reducer';
import * as GroceryStoresActions from '../store/groceryStores.actions';

@Component({
    selector: 'groceryStores-edit',
    templateUrl: './groceryStores-edit.component.html',
    styleUrls: ['./groceryStores-edit.component.css']
})
export class GroceryStoresEditComponent implements OnInit {
    @ViewChild('f', {static: false}) groceryStoresEditForm: NgForm;
    stateSubscription: Subscription;
    editMode = false;

    constructor(private store: Store<fromApp.AppState>) {}

    ngOnInit(): void {
        this.stateSubscription = this.store.select('groceryStores').subscribe(groceryStoresState => {
            if (groceryStoresState.editedGroceryStoreIndex > -1) {
                this.editMode = true;
                this.groceryStoresEditForm.setValue({
                    groceryStore: groceryStoresState.editedGroceryStore
                });
            }
        });
    }

    onClear() {
        this.groceryStoresEditForm.reset();
        this.editMode = false;
    }

    onSubmit(form: NgForm) {
        if (this.editMode) {
            this.store.dispatch(new GroceryStoresActions.UpdateGroceryStore(form.value.groceryStore));
            this.store.dispatch(new GroceryStoresActions.StopEdit());
        }
        else {
            this.store.dispatch(new GroceryStoresActions.AddGroceryStore(form.value.groceryStore));
        }
        this.onClear();
    }
}