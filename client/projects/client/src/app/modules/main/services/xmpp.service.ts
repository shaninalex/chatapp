import * as Stanza from 'stanza';  // https://github.com/legastero/stanza

import { v4 as uuid } from 'uuid';
import { Injectable } from "@angular/core";
import { IQType } from 'stanza/Constants';
import { IQ } from 'stanza/protocol';
import { environment } from '../../../../environments/environment.development';
import { IXmppService, operations } from '@lib';


@Injectable()
export class XmppService implements IXmppService {
    private _client: Stanza.Agent;
    private userId: string;
    private userJid: string;
    private domain: string = environment.XMPP_DOMAIN

    private messageIds: {[key: string]: string; } = {}

    constructor() { }

    // public get userID() { return this.userId; }
    // public get userJID() { return this.userJid; }

    private get userNotificationNode(): string {
        return `/home/ejabberd/${this.userId}/notifications`
    }

    public connect(id: string, token: string, host: string): void {
        this.userJid = `${id}@${environment.XMPP_DOMAIN}`;
        this.userId = id
        if (this._client !== undefined) return
        this._client = Stanza.createClient({
            jid: this.userJid,
            password: token,
            transports: {
                websocket: host,
                bosh: false
            }
        });

        // https://github.com/legastero/stanza/blob/8fe6380677d38982cd9926a71ade72c8f4f0eb28/src/Client.ts#L60
        // This thing should have the highest priority to be used first.
        this._client.sasl.register('X-OAUTH2', Stanza.SASL.PLAIN, 2000);

        // Routes
        this._client.on("session:started", () => this._handleStartSession());
        this._client.on("iq", (msg: IQ) => this._handleIq(msg));
        // this._client.on("presence", (p: Presence) => this.handlePresence(p))
        // this._client.on("presence:error", (p: Presence) => this.handlePresenceError(p))
        this._client.connect();
    }

    // Event handlers
    // =======================================

    private _handleStartSession() {
        this._client.sendPresence();
        this._client.getRoster();

        // NOTE: if user enable notifications in settings
        this._checkUserDefaultSubscription();

    }

    private _handleIq(msg: IQ) {
        // check default notification pubsub node existance
        if ("pubsub" in this.messageIds) {
            if (msg.id === this.messageIds["pubsub"]) {
                if (!msg.pubsub?.subscriptions?.items?.find(i => i.node === this.userNotificationNode)) {
                    this._pubsub_subscribe(`pubsub.${this.domain}`, this.userNotificationNode)
                }
                delete this.messageIds["pubsub"];
            }
        }
    }

    // Methods
    // =======================================

    private _checkUserDefaultSubscription() {
        // get all user subscription
        this._pubsub_query(`pubsub.${this.domain}`)
    }

    private _pubsub_query(to: string) {
        this.messageIds["pubsub"] = uuid();
        operations.pubsubQuery(this._client, to, this.messageIds["pubsub"])
    }

    private _pubsub_subscribe(to: string, node: string) {
        operations.pubsubSubscribe(this._client, to, node, this.userJid)
    }

    // Public
    public GetRoster() {
        this._client.getRoster();
    }
}
