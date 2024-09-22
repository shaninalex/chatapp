import { Observable } from 'rxjs';
import { ReceivedIQ, ReceivedMessage, ReceivedPresence } from 'stanza/protocol';

export interface IXmppService {
    connect(id: string, token: string, host: string): void
}

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
    handleMessage(message: ReceivedMessage): void
    handlePresence(presence: ReceivedPresence): void
    handleIQ(iq: ReceivedIQ): void
}