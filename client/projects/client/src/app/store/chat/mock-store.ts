import { ChatUser, Message, Room, RoomParticipant, RoomType } from "@lib"
import { v4 as uuid } from "uuid"
import { RoomsState } from "./reducers/rooms"
import { EntityAdapter, EntityState } from "@ngrx/entity"
import { MessageType, PresenceShow, RosterSubscription } from "stanza/Constants"
import { MessagesState } from "./reducers/messages"
import { ChatUsersState } from "./reducers/users"

const domain: string = "rocinante.ship"
const jimHolden: string = `JamesHolden@${domain}` // session user
const naomiNagata: string = `NaomiNagata@${domain}`
const amosBurton: string = `AmosBurton@${domain}`
const alexKamal: string = `AlexKamal@${domain}`
const roomBridge: string = `bridge@conversation.${domain}`
const roomGalley: string = `galley@conversation.${domain}`
const roomWorkshop: string = `workshop@conversation.${domain}`
const roomNotifications: string =  `notifications@conversation.${domain}`

export const MOCK_CHAT_STORE: {
    rooms: Room[],
    messages: Message[],
    users: ChatUser[],
    participants: RoomParticipant[],
} = {
    rooms: [
        {
            jid: roomBridge,
            name: "Bridge",
            unread: 0,
            image: "/assets/images/group3.png",
            type: RoomType.group,
            owner: jimHolden,
            parent: null,
            moderators: [jimHolden, naomiNagata],
        },
        {
            jid: roomGalley,
            name: "Galley",
            unread: 0,
            image: "/assets/images/group4.png",
            type: RoomType.group,
            owner: jimHolden,
            parent: null,
            moderators: [jimHolden, alexKamal],
        },
        {
            jid: `${roomGalley}/nagata`,
            name: "Naomi Nagata",
            unread: 0,
            image: "/assets/images/user-1.png",
            type: RoomType.group,
            owner: jimHolden,
            parent: roomGalley,
            moderators: [],
        },
        {
            jid: `notifications@conversation.${domain}`,
            name: "Notifications",
            unread: 0,
            image: "/assets/images/group2.png",
            type: RoomType.pubsub,
            owner: jimHolden,
            parent: null,
            moderators: [],
        },
        {
            jid: naomiNagata,
            name: "Naomi Nagata",
            unread: 0,
            image: "/assets/images/user-2.png",
            type: RoomType.normal,
            owner: jimHolden,
            parent: null,
            moderators: [],
        },
        {
            jid: amosBurton,
            name: "Amos Burton",
            unread: 0,
            image: "/assets/images/user-3.png",
            type: RoomType.normal,
            owner: jimHolden,
            parent: null,
            moderators: [],
        },
        {
            jid: alexKamal,
            name: "Alex Kamal",
            unread: 0,
            image: "/assets/images/user-4.png",
            type: RoomType.normal,
            owner: jimHolden,
            parent: null,
            moderators: [],
        },
        {
            jid: `workshop@conversation.${domain}`,
            name: "Workshop",
            unread: 0,
            image: "/assets/images/group5.png",
            type: RoomType.group,
            owner: amosBurton,
            parent: null,
            moderators: [amosBurton],
        },
    ],
    messages: [
        {
            id: uuid(),
            from: naomiNagata,
            to: jimHolden,
            timestamp: new Date().toISOString(),
            body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            read: true,
            type: MessageType.Chat,
        },
        {
            id: uuid(),
            from: naomiNagata,
            to: jimHolden,
            timestamp: new Date().toISOString(),
            body: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            read: true,
            type: MessageType.Chat,
        },
        {
            id: uuid(),
            from: amosBurton,
            to: jimHolden,
            timestamp: new Date().toISOString(),
            body: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            read: true,
            type: MessageType.Chat,
        },
        {
            id: uuid(),
            from: alexKamal,
            to: jimHolden,
            timestamp: new Date().toISOString(),
            body: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            read: true,
            type: MessageType.Chat,
        },
        {
            id: uuid(),
            from: `${roomBridge}/holden`,
            to: roomBridge,
            timestamp: new Date().toISOString(),
            body: "Curabitur pretium tincidunt lacus. Nulla gravida orci a odio, et faucibus metus sagittis nec.",
            read: true,
            type: MessageType.GroupChat,
        },
        {
            id: uuid(),
            from: `${roomGalley}/nagata`,
            to: roomGalley,
            timestamp: new Date().toISOString(),
            body: "Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem.",
            read: true,
            type: MessageType.GroupChat,
        },
        {
            id: uuid(),
            from: `${roomWorkshop}/amos`,
            to: roomWorkshop,
            timestamp: new Date().toISOString(),
            body: "Morbi in ipsum sit amet pede facilisis laoreet. Donec lacus nunc, viverra nec, blandit vel, egestas et, augue.",
            read: true,
            type: MessageType.GroupChat,
        },
        {
            id: uuid(),
            from: roomNotifications,
            to: jimHolden,
            timestamp: new Date().toISOString(),
            body: "Vitae elit libero, a pharetra augue. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat.",
            read: true,
            type: MessageType.Chat,
        }
    ],
    users: [
        {
            jid: naomiNagata,
            name: "Naomi Nagata",
            nickname: "naominagata",
            image: "/assets/images/user-1.png",
            subscription: RosterSubscription.Both,
            status: PresenceShow.Chat
        },
        {
            jid: amosBurton,
            name: "Amos Barton",
            nickname: "amosbarton",
            image: "/assets/images/user-2.png",
            subscription: RosterSubscription.Both,
            status: PresenceShow.Chat
        },
        {
            jid: alexKamal,
            name: "Alex Kamal",
            nickname: "alexkamal",
            image: "/assets/images/user-3.png",
            subscription: RosterSubscription.Both,
            status: PresenceShow.Chat
        }
    ],
    participants: [
        { jid: `${roomBridge}/holden` },
        { jid: `${roomGalley}/holden` },
        { jid: `${roomWorkshop}/holden` },
        { jid: `${roomBridge}/nagata` },
        { jid: `${roomGalley}/nagata` },
        { jid: `${roomWorkshop}/nagata` },
        { jid: `${roomBridge}/kamal` },
        { jid: `${roomGalley}/kamal` },
        { jid: `${roomWorkshop}/kamal` },
        { jid: `${roomBridge}/baron` },
        { jid: `${roomGalley}/baron` },
        { jid: `${roomWorkshop}/baron` },
    ],
}

export function fillState<T>(adapter: EntityAdapter<T>, items: T[]): EntityState<T> {
    let state = adapter.getInitialState();
    state = adapter.addMany(items, state);
    return state;
}