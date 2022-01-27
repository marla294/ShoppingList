import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'groceryStores',
    templateUrl: './groceryStores.component.html',
    styleUrls: ['./groceryStores.component.css']
})
export class GroceryStoresComponent implements OnInit {
    groceryStores: string[];

    ngOnInit() {
        this.groceryStores = [
            "Whole Foods"
        ];
    }
}