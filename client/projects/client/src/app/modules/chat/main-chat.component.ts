import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { UiService } from "@ui";
import { Observable } from "rxjs";
import { AppState } from "../../store/store";
import { XmppService } from "../../lib/services/xmpp.service";
import { XmppEventsDistributionService } from "../../lib/services/xmpp-events-distribution.service";
import { DiscoItems } from "stanza/protocol";
import { ChatRoomAdd } from "../../store/chat/actions";

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
