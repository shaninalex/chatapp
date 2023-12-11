import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Traits } from "../../../store/typedefs";
import { selectTraits } from "../../../store/selectors";
import { ProfileService } from "../../services/profile.service";
import { XmppService } from "../../services/xmpp.service";
import { IAppState } from "../../../store/store";


@Component({
    selector: "#app-header",
    templateUrl: "header.component.html"
})
export class HeaderComponent {
    identity$: Observable<Traits | undefined>;

    constructor(
        private store: Store<IAppState>,
        private xmpp: XmppService,
        private profile: ProfileService,
    ) {
        this.identity$ = this.store.select(selectTraits);
    }

    logout(): void {
        this.profile.getLogoutLink().subscribe({
            next: data => {
                this.xmpp.disconnect();
                window.location.href = data.logout_url;
            }
        })
    }
}
