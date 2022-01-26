import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import * as fromApp from '../store/app.reducer';

@Component({
    selector: 'units',
    templateUrl: './units.component.html',
    styleUrls: ['./units.component.css']
})
export class UnitsComponent implements OnInit, OnDestroy {
    units: string[];
    unitsSubscription: Subscription;

    constructor(private store: Store<fromApp.AppState>) {}
    
    ngOnInit(): void {
        this.unitsSubscription = this.store.select('units').subscribe(state => {
            this.units = state.units;
        });
    }

    ngOnDestroy(): void {
        this.unitsSubscription.unsubscribe();
    }
    
}