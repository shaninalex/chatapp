import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { XmppService } from "../../../../lib/services/xmpp.service";
import { DiscoItems, ReceivedMessage } from "stanza/protocol";
import { filter, Observable, switchMap } from "rxjs";

@Component({
    selector: 'app-room',
    templateUrl: './room.component.html'
})
export class RoomComponent implements OnInit {
    // TODO: proper close subscriptions
    // private subscriptions: Subscription = new Subscription();

    jid: string;
    messages$: Observable<ReceivedMessage>;
    participants$: Observable<DiscoItems>;

    constructor(private route: ActivatedRoute, private xmpp: XmppService) { }

    ngOnInit(): void {
        // this.subscriptions.add(
        this.messages$ = this.route.params.pipe(
            switchMap(({ jid }) => {
                this.jid = jid;
                this.xmpp.sendPresence(jid).subscribe();

                // I think this should be an IQ
                // this.participants$ = this.xmpp.getRoomParticipants(jid)
                return this.xmpp.receivedMessage$.pipe(
                    filter((message: ReceivedMessage) => message.from.startsWith(jid))
                );
            })
        );
        // )
    }

    // ngOnDesctroy(): void {
    //     this.subscriptions.unsubscribe()
    // }
}
