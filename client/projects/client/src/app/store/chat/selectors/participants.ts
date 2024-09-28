import { createSelector } from "@ngrx/store";
import { selectXmppFeature } from "./feature";
import { XmppState } from "../reducer";
import { ParticipantsAdapter } from "../reducers/participants";
import { RoomParticipant } from "@lib";

export const selectParticipantsFeature = createSelector(
    selectXmppFeature,
    (state: XmppState) => state.participants
);

export const selectParticipantsAll = createSelector(
    selectParticipantsFeature,
    ParticipantsAdapter.getSelectors().selectAll
);

export const selectParticipantsByRoom = (jid: string) => createSelector(
    selectParticipantsAll,
    (participants: RoomParticipant[]) => participants.filter(p => p.jid.toLowerCase().startsWith(jid.toLowerCase()))
);

