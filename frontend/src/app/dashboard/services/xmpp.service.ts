import { Injectable } from '@angular/core';
import * as Stanza from 'stanza';  // https://github.com/legastero/stanza
import { environment } from '../../../environments/environment.development';
import { Store } from '@ngrx/store';
import { ChatState } from 'stanza/Constants';
import { setContactsList } from '../../store/chat/chat.actions';
import { Observable, from } from 'rxjs';


@Injectable()
export class XmppService {
    private client: Stanza.Agent;

    constructor(
        private store: Store<ChatState>
    ) {}

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
            this.client.getRoster().then((data:any) => this.store.dispatch(setContactsList({list: data.items})));

            // change your status to "online"
            this.client.sendPresence();
        });

        this.client.on('iq', (msg: any) => {
            console.log("iq:", msg);
        });

        this.client.on('stanza', (msg: Stanza.Stanzas.Message | Stanza.Stanzas.Presence | Stanza.Stanzas.IQ) => {
            console.log("type:", msg.type, "payload:", msg);
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

    getVCard(jid: string): Promise<any> {
        // response of this request will be handled in xmpp events handlers
        return this.client.getVCard(jid)
    }

    addFriend(id: string): void {
      // add person to your contacts list
      this.client.subscribe(`${id}@localhost`);
    }

    getMessages(): void {
        // https://github.com/legastero/stanza/blob/master/docs/Reference.md#searchhistory
        // this.client.searchHistory()
    }
}
