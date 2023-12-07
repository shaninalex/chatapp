import { Injectable } from '@angular/core';
import * as Stanza from 'stanza';  // https://github.com/legastero/stanza
import { environment } from '../../../environments/environment.development';


@Injectable()
export class XmppService {
    private client: Stanza.Agent;

    constructor() {}

    connect(username: string, password: string): void {
        this.client = Stanza.createClient({
            jid: username,
            password: password,
            transports: {
                websocket: environment.WEBSOCKET_ADDRESS,
                bosh: false
            }
        });

        // https://github.com/legastero/stanza/blob/8fe6380677d38982cd9926a71ade72c8f4f0eb28/src/Client.ts#L60
        // This thing should have the highest priority to be used first.
        this.client.sasl.register('X-OAUTH2', Stanza.SASL.PLAIN, 2000);

        this.client.on('session:started', () => {
            this.client.getRoster();
            this.client.sendPresence();
        });

        this.client.on('chat', (msg: any) => {
            this.client.sendMessage({
                to: msg.from,
                body: 'You sent: ' + msg.body
            });
        });
        
        this.client.connect();
    }

    sendMessage(to: string, body: string): void {
        this.client.sendMessage({
            to: to,
            body: body,
        });
    }

    disconnect(): void {
        this.client.disconnect();
    }
}
