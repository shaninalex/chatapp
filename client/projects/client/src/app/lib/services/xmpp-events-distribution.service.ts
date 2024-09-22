import { DestroyRef, Injectable, OnDestroy } from "@angular/core";
import { AppState } from "../../store/store";
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { ReceivedIQ, ReceivedMessage, ReceivedPresence } from "stanza/protocol";
import { DistributionService } from "@lib";
import { MessageType } from "stanza/Constants";

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
    constructor(private store: Store<AppState>, private ref: DestroyRef) {}

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
     * @memberof EventsDistributionService
     */
    run(
        messages$: Observable<ReceivedMessage>,
        presence$: Observable<ReceivedPresence>,
        iq$: Observable<ReceivedIQ>,
    ): void {
        this.subscription.add(messages$.subscribe(data => this.handleMessage(data)))
        this.subscription.add(presence$.subscribe(data => this.handlePresence(data)))
        this.subscription.add(iq$.subscribe(data => this.handleIQ(data)))
    }

    /**
     *
     *
     * @param {ReceivedMessage} message
     * @memberof XmppEventsDistributionService
     */
    handleMessage(message: ReceivedMessage): void {
        console.log(message)
        // check if message type is Chat or GroupChat
        if (message.type === MessageType.GroupChat) {

        } else {

        }
    }

    /**
     *
     *
     * @param {ReceivedPresence} presence
     * @memberof XmppEventsDistributionService
     */
    handlePresence(presence: ReceivedPresence): void {
        // console.log("presence:", presence)
    }

    /**
     *
     *
     * @param {ReceivedIQ} iq
     * @memberof XmppEventsDistributionService
     */
    handleIQ(iq: ReceivedIQ): void {
        // console.log("iq:", iq)
    }

}