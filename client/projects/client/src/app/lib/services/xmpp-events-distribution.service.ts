import { DestroyRef, Injectable, OnDestroy } from "@angular/core";
import { AppState } from "../../store/store";
import { Store } from "@ngrx/store";
import { filter, map, Observable, of, Subscription, switchMap } from "rxjs";
import { ReceivedIQ, ReceivedMessage, ReceivedPresence } from "stanza/protocol";
import { DistributionService } from "@lib";

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
    subscription: Subscription = new Subscription
    constructor(private store: Store<AppState>, private ref: DestroyRef) { }

    ngOnDestroy(): void {
        this.subscription.unsubscribe()
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
    run(
        messages$: Observable<ReceivedMessage>,
        presence$: Observable<ReceivedPresence>,
        iq$: Observable<ReceivedIQ>,
    ): void {
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
