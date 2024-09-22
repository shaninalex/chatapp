import { Component } from "@angular/core";
import { UiService } from "@ui";
import { from, map, mergeMap, Observable } from "rxjs";
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
        this.queryRooms()
        this.eventsDistribution.run(
            this.xmpp.receivedMessage$,
            this.xmpp.receivedPrecense$,
            this.xmpp.receivedIQ$
        )
    }

    queryRooms(): void {
        this.xmpp.queryRoomsOnline().pipe(
            map((data) => (data.disco as DiscoItems).items || []),
            mergeMap((rooms: DiscoItem[]) => from(rooms)),
            mergeMap((room: DiscoItem) =>
                this.xmpp.getRoomInfo(room.jid as string).pipe(
                    map((info) => ({ room, info }))
                )
            ),
            map(({ room, info }) => {
                this.store.dispatch(ChatRoomAdd({
                    payload: { id: room.jid as string, info }
                }));
                return room;
            }),
            map((room) => [room])
        ).subscribe();
    }
}
