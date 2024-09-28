import { createSelector } from "@ngrx/store";
import { selectXmppFeature } from "./feature";
import { XmppState } from "../reducer";
import { RoomsAdapter } from "../reducers/rooms";
import { Room } from "@lib";

export const selectRoomsFeature = createSelector(
    selectXmppFeature,
    (state: XmppState) => state.rooms
)

export const selectRoomsAll = createSelector(
    selectRoomsFeature,
    RoomsAdapter.getSelectors().selectAll
);

export const selectRoomsByJID = (id: string) => createSelector(
    selectRoomsAll,
    (rooms: Room[]): Room | undefined => rooms.find(room => room.jid === id)
);

// TODO: select all root level conversations
// TODO: select all group chat privat conversations
