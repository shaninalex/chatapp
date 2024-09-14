import { createAction, props } from "@ngrx/store";
import { Room } from "./def";

// build name of actions like this:
// module: Chat
// submodule: Rooms
// actions: Add
// ChatRoomsAdd

export const ChatRoomAdd = createAction(
    "[chat] Save room",
    props<{ payload: Room }>()
)