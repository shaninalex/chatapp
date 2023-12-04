import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../../../store/identity/reducer";
import { Observable } from "rxjs";
import { Traits } from "../../../typedefs/identity";
import { selectTraits } from "../../../store/identity/selectors";

@Component({
    selector: "app-header",
    templateUrl: "header.component.html"
})
export class HeaderComponent {
    identity$: Observable<Traits>;

    constructor(private store: Store<AppState>) {
        this.identity$ = this.store.select(selectTraits);
    }
}
