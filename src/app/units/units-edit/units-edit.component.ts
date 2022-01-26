import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from '@angular/forms';
import { Store } from "@ngrx/store";
import * as UnitsActions from '../store/units.actions';
import * as fromApp from '../../store/app.reducer';

@Component({
    selector: 'units-edit',
    templateUrl: './units-edit.component.html',
    styleUrls: ['./units-edit.component.css']
})
export class UnitsEditComponent implements OnInit {
    @ViewChild('f', {static: false}) unitEditForm: NgForm;
    editMode = false;

    constructor(private store: Store<fromApp.AppState>) {}

    ngOnInit(): void {
    }

    onSubmit(form: NgForm) {
        let value = form.value;
        this.store.dispatch(new UnitsActions.AddUnit(value.unit));
        form.reset();
    }
}