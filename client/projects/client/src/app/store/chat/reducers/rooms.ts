import { createReducer, on } from "@ngrx/store";
import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import * as actions from '../actions/rooms';
import { Room } from "@lib";

export interface RoomsState extends EntityState<Room> { }

export const RoomsAdapter: EntityAdapter<Room> = createEntityAdapter<Room>({
    selectId: (model: Room) => model.jid
});

export const RoomsReducer = createReducer(
    RoomsAdapter.getInitialState(),
    on(actions.ChatRoomsAdd, (state, { payload }) => RoomsAdapter.addOne(payload, state)),
    on(actions.ChatRoomsUpdate, (state, { payload }) => RoomsAdapter.updateOne(payload, state)),
)
