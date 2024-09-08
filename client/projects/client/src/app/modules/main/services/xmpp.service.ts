import * as Stanza from 'stanza';  // https://github.com/legastero/stanza

import { Injectable } from "@angular/core";


@Injectable()
export class XmppService {
    private _client: Stanza.Agent;
    private userId: string;
    private userJid: string;

    constructor() {
        console.log("xmpp service imported")
    }

    public connect(jid: string, token: string, host: string): void {
        this.userJid = jid;
        if (this._client !== undefined) return
        this._client = Stanza.createClient({
            jid: jid,
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
        // this._client.on("session:started", () => this.handleStartSession());
        // this._client.on("iq", (msg: IQ) => this.handleIQ(msg));
        // this._client.on("presence", (p: Presence) => this.handlePresence(p))
        // this._client.on("presence:error", (p: Presence) => this.handlePresenceError(p))
        this._client.connect();
    }
}