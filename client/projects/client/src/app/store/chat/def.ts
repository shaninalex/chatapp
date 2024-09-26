import { DiscoInfo } from "stanza/protocol"

export interface Room {
    id: string
    info: DiscoInfo
}

export interface Conversation {
    jid: string
}