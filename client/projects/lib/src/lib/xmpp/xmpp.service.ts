import * as Stanza from 'stanza';  // https://github.com/legastero/stanza
import { IQ, Presence } from 'stanza/protocol';
import { PresenceType } from 'stanza/Constants';

import { v4 as uuid } from 'uuid';

// add this to index.html
// <script type="application/javascript">
// var global = window;
// </script>

export class XmppService {
    private _client: Stanza.Agent;
    private userId: string;
    private xmppWebsocketAddress: string

    constructor(address: string) {
        this.xmppWebsocketAddress = address
    }

    public connect(username: string, token: string, userId: string): void {
        this.userId = userId;
        if (this._client !== undefined) return
        this._client = Stanza.createClient({
            jid: username,
            password: token,
            transports: {
                websocket: this.xmppWebsocketAddress,
                bosh: false
            }
        });

        // https://github.com/legastero/stanza/blob/8fe6380677d38982cd9926a71ade72c8f4f0eb28/src/Client.ts#L60
        // This thing should have the highest priority to be used first.
        this._client.sasl.register('X-OAUTH2', Stanza.SASL.PLAIN, 2000);

        // Routes
        this._client.on("session:started", () => this.handleStartSession());
        this._client.on("iq", (msg: IQ) => this.handleIQ(msg));
        this._client.on("presence", (p: Presence) => this.handlePresence(p))
        this._client.on("presence:error", (p: Presence) => this.handlePresenceError(p))
        this._client.connect();
    }

    // ===================================
    // HANDLERS
    // This set of methods are only handle incoming messages

    private handlePresence(presence: Presence) {
        if (presence.type === 'subscribe') {
            console.log("Subscribe Presence: ", presence)
            // this.store.dispatch(addPresence({
            //     payload: {
            //         id: presence.id ? presence.id : uuid(),
            //         to: presence.to as string,
            //         from: presence.from as string,
            //         type: presence.type,
            //     }
            // }))
        }

        if (presence.type === 'subscribed') {
            console.log("subscribed presence: ", presence)
        }
    }

    private handlePresenceError(presenceError: Presence) {
        console.error(presenceError)
    }

    private handleStartSession() {
        this._client.sendPresence();
        this.getRoster();
        this._sendSubscribeToDefaultPubsubNode()
        this.fetchNotificationHistory()
    }

    private handlePubsubPublished(msg: any) {
        const pubsubMessage = msg as PubsubResponse
        if (!pubsubMessage.pubsub.items.published.length) return
        const message = JSON.parse(pubsubMessage.pubsub.items.published[0].content.summary.text) as AppNotification
        // this.store.dispatch(addNotification({ payload: message }))
        const m: AppNotification = {
            id: message.id,
            type: message.type,
            title: message.title,
            text: message.text,
            created_at: message.created_at
        }
        if (message.user) m.user = message.user
        if (message.room) m.room = message.room
    }

    private handleIQ(iq: IQ) {
        if (iq.roster) {
            if (iq.roster.items) {
                // this.store.dispatch(setRoster({
                //     items: iq.roster.items.map(item => ({
                //         jid: item.jid,
                //         roster: item,
                //     }))
                // }))
            }
        }
        if (iq.vcard && iq.from) {
            // TODO: fix infinite update loop
            // this.store.dispatch(updateRoster({
            //     update: {
            //         id: iq.from,
            //         changes: {
            //             vcard: iq.vcard,
            //         }
            //     }
            // }))
        }
    }

    // ===================================
    // INTERNAL ACTIONS
    // Automatic triggering actions on start or during work

    private fetchNotificationHistory() {
        try {
            const result = this._client.getItems(
                `pubsub.localhost`,
                this._userPubsub()
            );
            result.then(data => {
                if (!data?.items) return

                const messages = data.items.map(item => {
                    const m = item.content as Content
                    return JSON.parse(m.summary.text) as AppNotification
                });

                messages.sort((a: AppNotification, b: AppNotification) => {
                    return Date.parse(b.created_at) - Date.parse(a.created_at)
                })

                if (messages) {
                    // this.store.dispatch(pushNotifications({ payload: messages as AppNotification[] }))
                }
            }).finally(() => {
                this._client.on('pubsub:published', msg => this.handlePubsubPublished(msg));
            })
        } catch (error) {
            console.error('Failed to fetch notification history:', error);
        }
    }

    private _sendSubscribeToDefaultPubsubNode() {
        this._client.sendIQ({
            type: "set",
            to: `pubsub.${environment.XMPP_HOST}`,
            id: uuid(),
            pubsub: {
                subscribe: {
                    node: `/home/ejabberd/${this.userId}/notifications`,
                    jid: getJid(this.userId),
                }
            }
        });
    }

    private _userPubsub(): string {
        return `/home/ejabberd/${this.userId}/notifications`
    }

    // ===================================
    // ACTIONS
    // Public methods that triggered by UI

    // subscription
    // TODO: rename to sendUserPresense, since we send presence type as well
    public sendUserPresenceSubscription(toFullJid: string, pType: PresenceType) {
        // <presence from="alice@wonderland.lit" to="sister@realworld.lit" type="subscribe" />
        this._client.sendPresence({
            type: pType,
            from: getJid(this.userId),
            to: toFullJid,
        })
    }

    public getRoster() {
        this._client.getRoster();
    }

    public getVCard(jid: string) {
        this._client.getVCard(jid);
    }
}

