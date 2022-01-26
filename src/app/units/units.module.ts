import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { UnitsComponent } from "./units.component";
import { UnitsEditComponent } from "./units-edit/units-edit.component";

@NgModule({
    declarations: [
        UnitsComponent,
        UnitsEditComponent
    ],
    imports: [
        FormsModule,
        RouterModule.forChild([
            { path: '', component: UnitsComponent }
        ]),
        SharedModule
    ],
})
export class UnitsModule {

}