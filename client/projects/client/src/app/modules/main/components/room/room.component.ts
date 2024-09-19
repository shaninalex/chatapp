import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { XmppService } from "../../../../lib/services/xmpp.service";
import { ReceivedMessage, ReceivedPresence } from "stanza/protocol";
import { filter, map, Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../store/store";
import { ChatMessageAdd, ChatParticipantAdd, ChatParticipantRemove } from "../../../../store/chat/actions";
import { PresenceType } from "stanza/Constants";

@Component({
    selector: 'app-room',
    templateUrl: './room.component.html',
})
export class RoomComponent implements OnInit {
    jid: string;
    messages$: Observable<ReceivedMessage>;

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

                this.xmpp.receivedPrecense$.pipe(
                    filter((precense: ReceivedPresence) => precense.from.startsWith(jid)),
                    filter((precense: ReceivedPresence) => precense.from.split(this.jid + "/").length > 1),
                ).subscribe({
                    next: p => {
                        if (p.type === PresenceType.Unavailable) {
                            this.store.dispatch(ChatParticipantRemove({ id: p.from }))
                        } else {
                            this.store.dispatch(ChatParticipantAdd({ payload: p }))
                        }
                    }
                })
            }
        })
    }
}
