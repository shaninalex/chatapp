import { MessageType, MUCAffiliation, MUCRole, PresenceShow, RosterSubscription } from "stanza/Constants"

export enum RoomType {
    group,
    normal,
    pubsub,
}

export interface RoomParticipant {
    jid: string

    name?: string
    image?: string
    online?: string
    affiliation?: MUCAffiliation
    role?: MUCRole
    status?: PresenceShow
}

export interface Room {
    jid: string
    name: string
    unread: number
    image: string
    type: RoomType
    owner: string
    moderators: string[]
    parent: string | null
    time?: Date
    preview?: string
    selected?: boolean
}

export interface ChatUser {
    jid: string
    name: string
    nickname: string
    image: string
    subscription: RosterSubscription
    status: PresenceShow
}

export interface Message {
    id: string
    from: string
    to: string
    timestamp: string
    body: string
    read: boolean
    type: MessageType
}
