import {MessageType} from "stanza/Constants";

export interface UiConv {
    id: string
    name: string
    time: Date
    preview: string
    unread: number
    selected: boolean
    image?: string
    room: boolean
}

export interface UiCollocutorItem {
    id: string
    image: string
    name: string
}

export interface UiChatMessage {
    id: string
    from: string
    to: string
    body: string
    time?: Date
    type?: MessageType
}
