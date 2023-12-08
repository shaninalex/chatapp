import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Traits } from "../../../typedefs/identity";
import { selectTraits } from "../../../store/identity/selectors";
import { IAppState } from "../../../store";
import { ProfileService } from "../../services/profile.service";


@Component({
    selector: "app-header",
    templateUrl: "header.component.html"
})
export class HeaderComponent {
    identity$: Observable<Traits | undefined>;

    constructor(
        private store: Store<IAppState>,
        private profile: ProfileService,
    ) {
        this.identity$ = this.store.select(selectTraits);
    }

    logout(): void {
        this.profile.getLogoutLink().subscribe({
            next: data => window.location.href = data.logout_url
        })
    }
}
