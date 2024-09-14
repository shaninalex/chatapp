import * as Stanza from 'stanza';  // https://github.com/legastero/stanza
import { IQType } from "stanza/Constants"
import { IQ, Presence } from "stanza/protocol"


export function pubsubSubscribe(client: Stanza.Agent, to: string, node: string, jid: string): Promise<Stanza.Stanzas.IQ> {
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
    return client.sendIQ(iq)
}

export function pubsubQuery(client: Stanza.Agent, to: string): Promise<Stanza.Stanzas.IQ> {
    const iq: IQ = {
        type: IQType.Get,
        to: to,
        pubsub: {
            // xmlns: 'http://jabber.org/protocol/pubsub',
            subscriptions: {}
        }
    }
    return client.sendIQ(iq)
}

export function queryRoomsOnline(client: Stanza.Agent, to: string, type: "info" | "items"): Promise<Stanza.Stanzas.IQ> {
    const iq: IQ = {
        type: IQType.Get,
        to: to,
        payloadType: 'disco',
        disco: {
            type: type,
        }
    }
    return client.sendIQ(iq)
}

