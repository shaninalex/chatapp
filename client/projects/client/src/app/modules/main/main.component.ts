import { Component, OnInit } from "@angular/core";
import { UiService } from "@ui";
import { from, map, mergeMap, Observable, Subscription } from "rxjs";
import { XmppEventsDistributionService } from "../../lib/services/xmpp-events-distribution.service";
import { XmppService } from "../../lib/services/xmpp.service";
import { DiscoItem, DiscoItems } from "stanza/protocol";
import { ChatRoomAdd } from "../../store/chat/actions";
import { Store } from "@ngrx/store";
import { AppState } from "../../store/store";


@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrl: './main.component.css',
})
export class MainComponent {
    loading$: Observable<boolean>

    constructor(
        private ui: UiService,
        private store: Store<AppState>,
        private xmpp: XmppService,
        private eventsDistribution: XmppEventsDistributionService,
    ) {
        this.loading$ = this.ui.appLoading.asObservable()
        this.loadRoomsAndDispatch();
        this.eventsDistribution.run(
            this.xmpp.receivedMessage$,
            this.xmpp.receivedPrecense$,
            this.xmpp.receivedIQ$
        );
    }

    private loadRoomsAndDispatch() {
        this.xmpp.queryRoomsOnline().subscribe(data => {
            (data.disco as DiscoItems).items?.map(d => this.store.dispatch(ChatRoomAdd({ payload: d })));
        });
    }
}
