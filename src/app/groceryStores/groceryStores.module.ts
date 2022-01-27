import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { GroceryStoresComponent } from "./groceryStores.component";
import { GroceryStoresEditComponent } from "./groceryStores-edit/groceryStores-edit.component";

@NgModule({
    declarations: [
        GroceryStoresComponent,
        GroceryStoresEditComponent
    ],
    imports: [
        FormsModule,
        RouterModule.forChild([
            { path: '', component: GroceryStoresComponent }
        ]),
        SharedModule
    ]
})
export class GroceryStoresModule {
    
}