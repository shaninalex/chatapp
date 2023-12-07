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

        const factory = new Stanza.SASL.Factory();
        factory.register('PLAIN', Stanza.SASL.PLAIN, 10);
    
        this.client.

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
