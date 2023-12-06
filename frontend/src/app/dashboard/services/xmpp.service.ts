import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
declare const Strophe: any;



@Injectable()
export class XmppService {
    private connection: any;

    constructor() {
        this.connection = new Strophe.Connection(
            environment.WEBSOCKET_ADDRESS,
            // {
            //     mechanisms: [Strophe.SASLXOAuth2]
            // }
        );
    }

    connect(jid: string, password: string) {
        this.connection.connect(jid, password, this.onConnect.bind(this));
    }

    private onConnect(status: string) {
        if (status === Strophe.Status.CONNECTED) {
            console.log('Connected to XMPP server');
        } else {
            console.error('Failed to connect to XMPP server');
        }
    }

    disconnect() {
        this.connection.disconnect();
    }
}
