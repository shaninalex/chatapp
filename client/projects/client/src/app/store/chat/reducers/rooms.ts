import { createReducer, on } from "@ngrx/store";
import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import * as actions from '../actions/rooms';
import { Room } from "@lib";
import { fillState, MOCK_CHAT_STORE } from "../mock-store";

export interface RoomsState extends EntityState<Room> { }

export const RoomsAdapter: EntityAdapter<Room> = createEntityAdapter<Room>({
    selectId: (model: Room) => model.jid
});

const roomsInitialState = fillState<Room>(RoomsAdapter, MOCK_CHAT_STORE.rooms)

export const RoomsReducer = createReducer(
    roomsInitialState,
    on(actions.ChatRoomsAdd, (state, { payload }) => RoomsAdapter.addOne(payload, state)),
    on(actions.ChatRoomsUpdate, (state, { payload }) => RoomsAdapter.updateOne(payload, state)),
)
