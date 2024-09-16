import * as Stanza from 'stanza';  // https://github.com/legastero/stanza

import { Injectable } from "@angular/core";
import { environment } from '../../../environments/environment.development';
import { operations } from '@lib';
import { BehaviorSubject, filter, from, map, Observable, of, ReplaySubject, switchMap } from 'rxjs';
import { DiscoItem, DiscoItems, IQ, Message, ReceivedMessage } from 'stanza/protocol';
import { IQType } from 'stanza/Constants';
import disco from 'stanza/plugins/disco';


@Injectable({
    providedIn: 'root'
})
export class XmppService {
    private _client: Stanza.Agent | null = null;
    private _connected$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private _userJid: string;
    private _userID: string;

    private domain: string = environment.XMPP_DOMAIN;
    private conference: string = `conference.${environment.XMPP_DOMAIN}`;
    private pubsub: string = `pubsub.${environment.XMPP_DOMAIN}`;

    private _receivedMessage: ReplaySubject<ReceivedMessage> = new ReplaySubject(1);
    public receivedMessage$: Observable<ReceivedMessage> = this._receivedMessage.asObservable();

    public get connected$(): Observable<boolean> {
        return this._connected$.asObservable();
    }

    public connect(id: string, token: string, host: string): Observable<void> {
        if (this._client) {
            return of(undefined);
        }

        return new Observable<void>(observer => {
            const userJid = `${id}@${this.domain}`;
            this._userJid = userJid;
            this._userID = id;

            this._client = Stanza.createClient({
                jid: userJid,
                password: token,
                transports: {
                    websocket: host,
                    bosh: false
                }
            });

            this._client.sasl.register('X-OAUTH2', Stanza.SASL.PLAIN, 2000);

            this._client.on('session:started', () => {
                this._client?.sendPresence();
                this._connected$.next(true);
                observer.next();
                observer.complete();
            });

            // this._client.on("iq", iq => console.log("iq", iq))

            // add every new ReceivedMessage to BehaviorSubject
            // every room will filter every message by room jid
            this._client.on("message", (msg: ReceivedMessage) => this._receivedMessage.next(msg))
            // this._client.on("message:acked", (msg: Message) => console.log("message:acked", msg))

            this._client.on('disconnected', () => {
                this._client = null;
                this._connected$.next(false);
            });

            this._client.connect();
        });
    }

    public getRoster(): Observable<Stanza.Stanzas.RosterResult> {
        return this._connected$.pipe(
            filter(connected => connected),
            switchMap(() => from(this._client!.getRoster()))
        );
    }

    public getPubsub(): Observable<any> {
        return this._connected$.pipe(
            filter(connected => connected),
            switchMap(() => from(operations.pubsubQuery(this._client!, this.pubsub)))
        );
    }

    public queryRoomsOnline(): Observable<Stanza.Stanzas.IQ> {
        return this._connected$.pipe(
            filter(connected => connected),
            switchMap(() => from(operations.queryRoomsOnline(this._client!, this.conference, 'items')))
        );
    }

    public sendMessage(to: string, body: string): Observable<string> {
        // TODO: move send operation to operations.ts
        return this._connected$.pipe(
            filter(connected => connected),
            switchMap(() => from(this._client!.sendMessage({ to, body })))
        );
    }

    public sendPresence(to: string): Observable<string> {
        // TODO: move send operation to operations.ts
        return this._connected$.pipe(
            filter(connected => connected),
            switchMap(() => from(this._client!.sendPresence({
                to: `${to}/${this._userID}`,
            })))
        )
    }

    public getRoomParticipants(roomJid: string): Observable<DiscoItems> {
        // TODO: move send operation to operations.ts
        return this._connected$.pipe(
            filter(connected => connected),
            switchMap(() => from(this._client!.sendIQ({
                to: roomJid,
                type: IQType.Get,
                disco: {
                    type: "items"
                },
            })).pipe(
                map(result => result.disco as DiscoItems)
            ))
        )
    }
}

