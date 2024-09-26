import { createAction, props } from "@ngrx/store";
import { Conversation } from "./def";
import { DiscoItem, ReceivedMessage, ReceivedPresence } from "stanza/protocol";

// build name of actions like this:
// module: Chat
// submodule: Rooms
// actions: Add
// ChatRoomsAdd

export const ChatRoomAdd = createAction(
    "[chat] add room",
    props<{ payload: DiscoItem }>()
)

export const ChatMessageAdd = createAction(
    "[chat] add message",
    props<{ payload: ReceivedMessage }>()
)

export const ChatParticipantAdd = createAction(
    "[chat] add participant",
    props<{ payload: ReceivedPresence }>()
)

export const ChatParticipantRemove = createAction(
    "[chat] remove participant",
    props<{ id: string }>()
)

export const ChatConversationAdd = createAction(
    "[chat] add conversation",
    props<{ payload: Conversation }>()
)

export const ChatSubscriptionAdd = createAction(
    "[subscription] add subscription item",
    props<{ payload: ReceivedPresence }>()
)