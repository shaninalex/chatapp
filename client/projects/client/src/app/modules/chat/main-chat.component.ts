import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "@store/store";
import { UiService } from "@ui";
import { Observable, of, switchMap } from "rxjs";
import { XmppService } from "../../lib/services/xmpp.service";
import { XmppEventsDistributionService } from "../../lib/services/xmpp-events-distribution.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
    selector: "app-chat",
    templateUrl: "./main-chat.component.html"
})
export class MainChatComponent {
    loading$: Observable<boolean>

    constructor(
        private ui: UiService,
        private store: Store<AppState>,
        private xmpp: XmppService,
        private eventsDistribution: XmppEventsDistributionService,
    ) {
        this.ui.title.next("Chat");
        this.loading$ = this.ui.appLoading.asObservable();


        this.eventsDistribution.start(this.xmpp);
    }
}
