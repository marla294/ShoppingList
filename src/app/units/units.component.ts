import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'units',
    templateUrl: './units.component.html',
    styleUrls: ['./units.component.css']
})
export class UnitsComponent implements OnInit {
    units: string[];
    
    ngOnInit(): void {
        this.units = ["oz(s)"];
    }
    
}