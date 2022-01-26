import { Component, ViewChild } from "@angular/core";
import { NgForm } from '@angular/forms';

@Component({
    selector: 'units-edit',
    templateUrl: './units-edit.component.html',
    styleUrls: ['./units-edit.component.css']
})
export class UnitsEditComponent {
    @ViewChild('f', {static: false}) unitEditForm: NgForm;

    onSubmit(form: NgForm) {
        
    }
}