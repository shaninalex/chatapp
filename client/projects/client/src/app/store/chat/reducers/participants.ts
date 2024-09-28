import { RoomParticipant } from "@lib";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import * as actions from "../actions/participants"

export interface ParticipantsState extends EntityState<RoomParticipant> {}

export const ParticipantsAdapter: EntityAdapter<RoomParticipant> = createEntityAdapter<RoomParticipant>({
    selectId: (model: RoomParticipant) => model.jid
})

export const ParticipantsInitialState: ParticipantsState = ParticipantsAdapter.getInitialState()

export const ParticipantsReducer = createReducer(
    ParticipantsInitialState,
    on(actions.ChatParticipantsAdd, (state, { participant }) => ParticipantsAdapter.addOne(participant, state)),
    on(actions.ChatParticipantsAddMany, (state, { participants }) => ParticipantsAdapter.addMany(participants, state)),
    on(actions.ChatParticipantsUpdate, (state, { update }) => ParticipantsAdapter.updateOne(update, state)),
    on(actions.ChatParticipantsAddRemove, (state, { id }) => ParticipantsAdapter.removeOne(id, state)),
)