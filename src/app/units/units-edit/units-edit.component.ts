import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NgForm } from '@angular/forms';
import { Store } from "@ngrx/store";
import * as UnitsActions from '../store/units.actions';
import * as fromApp from '../../store/app.reducer';
import { Subscription } from "rxjs";

@Component({
    selector: 'units-edit',
    templateUrl: './units-edit.component.html',
    styleUrls: ['./units-edit.component.css']
})
export class UnitsEditComponent implements OnInit, OnDestroy {
    @ViewChild('f', {static: false}) unitEditForm: NgForm;
    stateSubscription: Subscription;
    editMode = false;
    editedUnitIndex: number = -1;

    constructor(private store: Store<fromApp.AppState>) {}
    
    ngOnInit(): void {
        this.stateSubscription = this.store.select('units').subscribe(state => {
            if (state.editedUnitIndex > -1) {
                this.editMode = true;
                this.editedUnitIndex = state.editedUnitIndex;
                this.unitEditForm.setValue({
                    unit: state.editedUnit
                });
            }
        });
    }

    ngOnDestroy(): void {
        this.stateSubscription.unsubscribe();
    }

    onClear() {
        this.unitEditForm.reset();
        this.editMode = false;
        this.editedUnitIndex = -1;
    }

    onDelete() {
        this.store.dispatch(new UnitsActions.DeleteUnit());
        this.onClear();
    }

    onSubmit(form: NgForm) {
        let value = form.value;
        if (this.editMode) {
            this.store.dispatch(new UnitsActions.UpdateUnit(value.unit));
        }
        else {
            this.store.dispatch(new UnitsActions.AddUnit(value.unit));
        }
        this.onClear();
    }
}