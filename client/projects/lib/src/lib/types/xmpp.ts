import { Observable } from 'rxjs';
import { PresenceType } from 'stanza/Constants';
import { ReceivedIQ, ReceivedMessage, ReceivedPresence } from 'stanza/protocol';

export interface IXmppService {
    connect(id: string, token: string, host: string): void
}

export const SubscriptionTypes: string[] = [
    PresenceType.Subscribe,
    PresenceType.Subscribed,
    PresenceType.Unsubscribe,
    PresenceType.Unsubscribed,
]

export interface XmppUserToken {
    token: string
    expire: number
}

export interface DistributionService {
    run(
        messages$: Observable<ReceivedMessage>,
        presence$: Observable<ReceivedPresence>,
        iq$: Observable<ReceivedIQ>,
    ): void
}