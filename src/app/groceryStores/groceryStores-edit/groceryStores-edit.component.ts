import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
    selector: 'groceryStores-edit',
    templateUrl: './groceryStores-edit.component.html',
    styleUrls: ['./groceryStores-edit.component.css']
})
export class GroceryStoresEditComponent {
    @ViewChild('f', {static: false}) groceryStoresEditForm: NgForm;

    onSubmit(form: NgForm) {
        
    }
}