import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { UnitsComponent } from "./units.component";

@NgModule({
    declarations: [
        UnitsComponent
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