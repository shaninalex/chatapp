import { Injectable, OnDestroy } from "@angular/core";
import { AppState } from "@store/store";
import { Store } from "@ngrx/store";
import { connect, filter, map, Observable, of, Subscription, switchMap, take, takeLast, tap } from "rxjs";
import { ReceivedIQ, ReceivedMessage, ReceivedPresence } from "stanza/protocol";
import { DistributionService } from "@lib";
import { XmppService } from "./xmpp.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

/**
 *
 * Service to save event data from xmpp to NGRX It will help to
 * subscribe only for store selectors instead of direct consuming
 * for XmppService. The idea is to have single point in application
 * where we subscribe to all xmpp events
 *
 * @export
 * @class EventsDistributionService
 */
@Injectable()
export class XmppEventsDistributionService implements DistributionService, OnDestroy {
    sub: Subscription = new Subscription
    constructor(private store: Store<AppState>) { }

    ngOnDestroy(): void {
        this.sub.unsubscribe()
    }

    start(xmpp: XmppService) {
        this.sub.add(
            xmpp.connected$.pipe(
                filter(connect => connect),
                take(1),
                tap(() => {
                    // run initial queries
                    this.initialQueries(xmpp);

                    // provide event sources to distrtibution service
                    this.distribute(
                        xmpp.receivedMessage$,
                        xmpp.receivedPrecense$,
                        xmpp.receivedIQ$
                    );

                }),
            ).subscribe()
        )
    }

    initialQueries(xmpp: XmppService): void {
        // get static list of rooms
        this.sub.add(xmpp.queryRoomsOnline().subscribe());

        // pubsub
        this.sub.add(xmpp.getPubsub().subscribe());

        // contact list
        this.sub.add(
            xmpp.getRoster().pipe(
                switchMap((roster, index) => {
                    // TODO: refactor
                    roster.items.map(item => {
                        xmpp.getVCard(item.jid).subscribe(result => console.log(result));
                    })
                    return of(roster);
                }),
            ).subscribe()
        );
    }

    /**
     *
     * Distribute and store events data from xmpp
     *
     * @param {Observable<ReceivedMessage>} messages$
     * @param {Observable<ReceivedPresence>} presence$
     * @param {Observable<ReceivedIQ>} iq$
     * @memberof XmppEventsDistributionService
     */
    distribute(
        messages$: Observable<ReceivedMessage>,
        presence$: Observable<ReceivedPresence>,
        iq$: Observable<ReceivedIQ>,
    ): void {
        this.sub.add(
            iq$.pipe(
                map(iq => {
                    console.log(iq);
                    return iq;
                })
            ).subscribe()
        );

        // this.subscription.add(
        //     messages$.pipe(
        //         switchMap((message: ReceivedMessage) => {
        //             if (message.type !== MessageType.GroupChat) {
        //                 return this.store.select(selectConversationByJid(message.from)).pipe(
        //                     map((conversation) => {
        //                         if (conversation && conversation.length === 0) {
        //                             this.store.dispatch(ChatConversationAdd({ payload: { jid: message.from} }))
        //                         }
        //                         return message;
        //                     })
        //                 );
        //             }
        //             return of(message);
        //         }),
        //         filter(message => message.body !== undefined)
        //     ).subscribe((message) => this.store.dispatch(ChatMessageAdd({ payload: message }))),
        // );

        // this.subscription.add(
        //     presence$.pipe(
        //         map(presence => {
        //             if (presence.type && SubscriptionTypes.includes(presence.type)) {
        //                 this.store.dispatch(ChatSubscriptionAdd({ payload: presence }))
        //             }
        //         })
        //     ).subscribe(),
        // );
    }
}
