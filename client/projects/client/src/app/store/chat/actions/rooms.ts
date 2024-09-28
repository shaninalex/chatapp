import { Room } from "@lib";
import { Update } from "@ngrx/entity";
import { createAction, props } from "@ngrx/store";

export const ChatRoomsAdd = createAction(
    "[chat room] add",
    props<{ payload: Room }>()
)

export const ChatRoomsUpdate = createAction(
    "[chat room] add",
    props<{ payload: Update<Room> }>()
)
