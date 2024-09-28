import { createSelector } from "@ngrx/store";
import { selectXmppFeature } from "../selectors";
import { XmppState } from "../reducer";
import { RoomsAdapter } from "../reducers/rooms";


export const selectRoomsFeature = createSelector(
    selectXmppFeature,
    (state: XmppState) => state.rooms
)

export const selectRoomsAll = createSelector(
    selectRoomsFeature,
    RoomsAdapter.getSelectors().selectAll
);

// TODO: select all root level conversations
// TODO: select all group chat privat conversations
