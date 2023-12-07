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

            // get contact list
            this.client.getRoster().then(data => {
                console.log("get Roster", data);
            });

            // change your status to "online"
            this.client.sendPresence();
        });

        this.client.on('iq', (msg: any) => {
            console.log("iq:", msg);
        });


        this.client.on('stanza', (msg: any) => {
            console.log("stanza:", msg);
        });


        this.client.on('chat', (msg: any) => {
            console.log("chat:", msg);
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
