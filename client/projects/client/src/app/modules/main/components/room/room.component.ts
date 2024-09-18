import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { XmppService } from "../../../../lib/services/xmpp.service";
import { DiscoItems, ReceivedMessage } from "stanza/protocol";
import { filter, map, Observable, switchMap } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../store/store";
import { ChatMessageAdd } from "../../../../store/chat/actions";

@Component({
    selector: 'app-room',
    templateUrl: './room.component.html',
})
export class RoomComponent implements OnInit {
    jid: string;
    messages$: Observable<ReceivedMessage>;
    participants$: Observable<DiscoItems>;

    constructor(
        private route: ActivatedRoute,
        private xmpp: XmppService,
        private store: Store<AppState>,
    ) { }

    ngOnInit(): void {
        this.route.params.subscribe({
            next: ({ jid }) => {
                this.jid = jid;
                this.xmpp.sendPresenceRoom(jid).subscribe();

                this.messages$ = this.xmpp.receivedMessage$.pipe(
                    filter((message: ReceivedMessage) => message.from.startsWith(jid)),
                    map(msg => {
                        if (msg.body) {
                            // save to store only messages that has a "body" property
                            this.store.dispatch(ChatMessageAdd({ payload: msg }))
                        }
                        // all not printable goes to <app-chat-state>
                        return msg
                    })
                );
            }
        })

    }
}
