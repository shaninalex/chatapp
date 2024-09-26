import { v4 as uuid } from "uuid"
import {UiChatMessage} from "@lib";
import {MessageType} from "stanza/Constants";

export const conversation_1: UiChatMessage[] = [
    {
        id: uuid(),
        from: "jackrayan@localhost",
        to: "mornignmetting@conversation.localhost",
        body: "Hi! How are you?",
        time: new Date(),
        type: MessageType.GroupChat,
    },
    {
        id: uuid(),
        from: "albert@localhost",
        to: "mornignmetting@conversation.localhost",
        body: "we are good. You?",
        time: new Date(),
        type: MessageType.GroupChat,
    },
    {
        id: uuid(),
        from: "jackrayan@localhost",
        to: "mornignmetting@conversation.localhost",
        body: "Perfect. Ready for work?",
        time: new Date(),
        type: MessageType.GroupChat,
    },
    {
        id: uuid(),
        from: "newuser@localhost",
        to: "mornignmetting@conversation.localhost",
        body: "Good morning!",
        time: new Date(),
        type: MessageType.GroupChat,
    },
]
