import * as Stanza from 'stanza';  // https://github.com/legastero/stanza

import { Injectable } from "@angular/core";
import { environment } from '../../../environments/environment.development';
import { IXmppService, operations } from '@lib';
import { BehaviorSubject, filter, from, map, Observable, of, ReplaySubject, switchMap } from 'rxjs';
import { DiscoInfo, DiscoItems, ReceivedIQ, ReceivedMessage, ReceivedPresence } from 'stanza/protocol';


@Injectable({
    providedIn: 'root'
})
export class XmppService implements IXmppService {
    private _client: Stanza.Agent | null = null;
    private _connected$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private _userJid: string;
    private _userID: string;

    private domain: string = environment.XMPP_DOMAIN;
    private conference: string = `conference.${environment.XMPP_DOMAIN}`;
    private pubsub: string = `pubsub.${environment.XMPP_DOMAIN}`;

    private _receivedMessage: ReplaySubject<ReceivedMessage> = new ReplaySubject(1);
    private _receivedPrecense: ReplaySubject<ReceivedPresence> = new ReplaySubject(1);
    private _receivedIQ: ReplaySubject<ReceivedIQ> = new ReplaySubject(1);

    public receivedMessage$: Observable<ReceivedMessage> = this._receivedMessage.asObservable();
    public receivedPrecense$: Observable<ReceivedPresence> = this._receivedPrecense.asObservable();
    public receivedIQ$: Observable<ReceivedIQ> = this._receivedIQ.asObservable();

    public get userJid(): string { return this._userJid }
    public get userID(): string { return this._userJid }

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

            this._client.on("message", (msg: ReceivedMessage) => this._receivedMessage.next(msg))
            this._client.on("presence", (p: ReceivedPresence) => this._receivedPrecense.next(p));
            this._client.on("iq", (q: ReceivedIQ) => this._receivedIQ.next(q));

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

    public sendRoomMessage(to: string, body: string, sender: string): Observable<string> {
        return this._connected$.pipe(
            filter(connected => connected),
            switchMap(() => from(operations.sendRoomMessage(this._client!, to, body, sender)))
        );
    }

    public sendPresenceRoom(roomJid: string, nickname: string = this._userID): Observable<string> {
        return this._connected$.pipe(
            filter(connected => connected),
            switchMap(() => from(operations.precenseRoom(this._client!, roomJid, nickname)))
        )
    }

    public getRoomInfo(roomJid: string): Observable<DiscoInfo> {
        return this._connected$.pipe(
            filter(connected => connected),
            switchMap(() => from(operations.queryRoomInfo(this._client!, roomJid)).pipe(
                map(result => result.disco as DiscoInfo)
            ))
        )
    }
}

