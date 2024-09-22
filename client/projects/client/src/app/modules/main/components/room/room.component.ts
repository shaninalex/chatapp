import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { XmppService } from "../../../../lib/services/xmpp.service";
import { ReceivedMessage, ReceivedPresence } from "stanza/protocol";
import { filter, map, Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../store/store";
import { ChatMessageAdd, ChatParticipantAdd, ChatParticipantRemove } from "../../../../store/chat/actions";
import { MessageType, PresenceType } from "stanza/Constants";
import { UserService } from "../../../../lib/services/user.service";

@Component({
    selector: 'app-room',
    templateUrl: './room.component.html',
})
export class RoomComponent implements OnInit {
    jid: string;
    messages$: Observable<ReceivedMessage>;
    nickname: string

    constructor(
        private route: ActivatedRoute,
        private xmpp: XmppService,
        private store: Store<AppState>,
        private user: UserService,
    ) {
    }

    ngOnInit(): void {
        this.route.params.subscribe({
            next: ({ jid }) => {
                this.jid = jid;
                this.xmpp.sendPresenceRoom(jid, this.user.username).subscribe();
                this.messages$ = this.xmpp.receivedMessage$.pipe(
                    filter((message: ReceivedMessage) => message.from.startsWith(jid)),
                    filter((message: ReceivedMessage) => message.type === MessageType.GroupChat),
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
                        switch (p.type) {
                            case PresenceType.Unavailable:
                                this.store.dispatch(ChatParticipantRemove({ id: p.from }))
                                break
                            case PresenceType.Error:
                                console.log(p)
                                break
                            default:
                                this.store.dispatch(ChatParticipantAdd({ payload: p }))
                        }
                    }
                })
            }
        })
    }
}
