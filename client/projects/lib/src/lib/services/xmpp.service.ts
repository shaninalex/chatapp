import * as Stanza from 'stanza';  // https://github.com/legastero/stanza
import { environment } from '../../../../client/src/environments/environment.development';

import { Injectable } from "@angular/core";


@Injectable()
export class XmppService {
    private _client: Stanza.Agent;
    private userId: string;
    private userJid: string;
    

    constructor() {
        console.log("xmpp service imported")
    }

    public connect(username: string, token: string, userId: string): void {
        this.userId = userId;
        if (this._client !== undefined) return
        this._client = Stanza.createClient({
            jid: username,
            password: token,
            transports: {
                websocket: environment.XMPP_WEBSOCKET_ADDRESS,
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
        try {
            this._client.connect();
            console.log("xmpp connected")
        } catch(e) {
            console.log(e)
        }
    }
}