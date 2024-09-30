import { Room } from "@lib";
import { Update } from "@ngrx/entity";
import { createAction, props } from "@ngrx/store";

export const ChatRoomsAdd = createAction(
    "[chat room] add",
    props<{ payload: Room }>()
)

export const ChatRoomsUpdate = createAction(
    "[chat room] update",
    props<{ payload: Update<Room> }>()
)

export const ChatRoomsSelect = createAction(
    "[chat room] select",
    props<{ payload: Update<Room> }>()
)

export const ChatRoomSentPresence = createAction(
    "[chat rooms] sent presence to room",
    props<{ jid: string }>()
)