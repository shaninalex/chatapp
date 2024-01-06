import { Injectable } from '@angular/core';
import * as Stanza from 'stanza';  // https://github.com/legastero/stanza
import { environment } from '../../../environments/environment.development';
import { Store } from '@ngrx/store';
import { setContactsList, setVCardItem } from '../store/chat/chat.actions';
import { IDashboardState } from '../store/store';
import { SubsActions } from '../store/actions';
import { v4 as uuid } from 'uuid';
import { Observable, of } from 'rxjs';


export interface ChatMessage {
  from: string
  id: string
  lang: string
  to: string
  alternateLanguageBodies: AlternateLanguageBody[]
  body: string
  type: string
  chatState: string
}

export interface AlternateLanguageBody {
  lang: string
  value: string
}



@Injectable()
export class XmppService {
  private client: Stanza.Agent;

  constructor(private store: Store<IDashboardState>) { }

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
        if (data) this.store.dispatch(setContactsList({ list: data.items }))
      });

      // change your status to "online"
      this.client.sendPresence();
    });

    this.client.on('iq', (msg: any) => {
      console.log("iq:", msg);
    });

    this.client.on('chat', (msg: any) => {
      console.log("chat:", msg);
    });

    this.client.on('subscribe', (msg: any) => {
      this.store.dispatch(SubsActions.new({ sub: { id: msg.from, ...msg } }));
    });

    this.client.on('subscribed', (msg: any) => {
      // this.store.dispatch(SubsActions.approve_sub({ from: msg }));
    });

    this.client.on('roster:update', (msg: any) => {
      console.log("roster:update:", msg);
    });

    this.client.on('presence', (msg: any) => {
      console.log("presence:", msg);
    });

    this.client.on('groupchat', (msg: any) => {
      console.log("groupchat:", msg);
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

  getVCard(jid: string): void {
    this.client.getVCard(jid).then(vcard => {
      if (vcard) this.store.dispatch(setVCardItem({ jid, vcard }));
    })
  }

  subscribe(id: string): void {
    // add person to your contacts list
    this.client.subscribe(`${id}@localhost`);
  }

  approve_sub(from: string): Observable<any> {
    return of(this.client.sendPresence({ to: from, type: "subscribed" }));
  }

  getMessages(): void {
    // https://github.com/legastero/stanza/blob/master/docs/Reference.md#searchhistory
    // this.client.searchHistory()
  }

  getRoster(): Observable<any> {
    return of(this.client.getRoster());
  }
}
