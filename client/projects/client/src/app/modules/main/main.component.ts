import { Component } from "@angular/core";
import { UiService } from "@ui";
import { map, Observable } from "rxjs";

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrl: './main.component.css',
})
export class MainComponent {
    loading$: Observable<boolean>

    constructor(private ui: UiService) {
        this.loading$ = this.ui.appLoading.asObservable()
    }
}
