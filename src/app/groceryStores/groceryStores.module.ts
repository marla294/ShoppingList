import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { GroceryStoresComponent } from "./groceryStores.component";

@NgModule({
    declarations: [
        GroceryStoresComponent
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