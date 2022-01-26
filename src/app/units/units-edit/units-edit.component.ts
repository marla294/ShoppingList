import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from '@angular/forms';

@Component({
    selector: 'units-edit',
    templateUrl: './units-edit.component.html',
    styleUrls: ['./units-edit.component.css']
})
export class UnitsEditComponent implements OnInit {
    @ViewChild('f', {static: false}) unitEditForm: NgForm;
    editMode = false;

    ngOnInit(): void {
    }

    onSubmit(form: NgForm) {
        let value = form.value;
    }
}