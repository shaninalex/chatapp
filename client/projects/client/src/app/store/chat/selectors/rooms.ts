import { createSelector } from "@ngrx/store";
import { selectXmppFeature } from "./feature";
import { XmppState } from "../reducer";
import { RoomsAdapter, RoomsState } from "../reducers/rooms";
import { Room } from "@lib";

export const selectRoomsFeature = createSelector(
    selectXmppFeature,
    (state: XmppState) => state.rooms
)

export const selectRoomsAll = createSelector(
    selectRoomsFeature,
    RoomsAdapter.getSelectors().selectAll
);

export const selectRoomByJID = (id: string) => createSelector(
    selectRoomsFeature,
    (state: RoomsState) => state.entities[id]
);

export const selectPrivateRooms = (jid: string) => createSelector(
    selectRoomsAll,
    (rooms: Room[]) => rooms.filter(room => room.jid !== jid).filter(room => room.jid.startsWith(jid))
);

