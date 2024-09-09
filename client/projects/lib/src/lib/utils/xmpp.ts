import * as Stanza from 'stanza';  // https://github.com/legastero/stanza
import { IQType } from "stanza/Constants"
import { IQ } from "stanza/protocol"

export function pubsubSubscribe(client: Stanza.Agent, to: string, node: string, jid: string) {
    const iq: IQ = {
        type: IQType.Set,
        to: to,
        pubsub: {
            subscribe: {
                node: node,
                jid: jid
            }
        }
    }
    client.sendIQ(iq)
}

export function pubsubQuery(client: Stanza.Agent, to: string, id?: string) {
    const iq: IQ = {
        type: IQType.Get,
        to: to,
        pubsub: {
            // xmlns: 'http://jabber.org/protocol/pubsub',
            subscriptions: {}
        }
    }
    if (id) {
        iq.id = id
    }
    client.sendIQ(iq)
}