
import { createReducer, createSelector, on } from "@ngrx/store";
import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import * as actions from '../actions';
import { ReceivedPresence } from "stanza/protocol";
import { selectXmppFeature } from "../selectors";
import { XmppState } from "../reducer";

export interface ParticipantsState extends EntityState<ReceivedPresence> { }
export const ParticipantsAdapter: EntityAdapter<ReceivedPresence> = createEntityAdapter<ReceivedPresence>({
    selectId: (model: ReceivedPresence) => model.from
});
export const initialParticipants: ParticipantsState = ParticipantsAdapter.getInitialState();

export const participantsReducer = createReducer(
    initialParticipants,
    on(actions.ChatParticipantAdd, (state, { payload }) => ParticipantsAdapter.addOne(payload, state)),
    on(actions.ChatParticipantRemove, (state, { id }) => ParticipantsAdapter.removeOne(id, state)),
)

export const selectParticipantsFeature = createSelector(
    selectXmppFeature,
    (state: XmppState) => state.participants
)

export const selectAllParticipants = createSelector(
    selectParticipantsFeature,
    ParticipantsAdapter.getSelectors().selectAll
);

export const selectParticipantsByRoom = (jid: string) => createSelector(
    selectAllParticipants,
    (participants: ReceivedPresence[]) => participants.filter(participant => participant.from.startsWith(jid))
);
