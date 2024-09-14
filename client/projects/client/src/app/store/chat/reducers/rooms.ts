import { createReducer, createSelector, on } from "@ngrx/store";
import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import * as actions from './actions';
import { Room } from "./def";

export interface RoomsState extends EntityState<Room> { }
export const RoomsAdapter: EntityAdapter<Room> = createEntityAdapter<Room>();
export const initialRooms: RoomsState = RoomsAdapter.getInitialState();

export const roomsReducer = createReducer(
    initialRooms,
    on(actions.ChatRoomAdd, (state, { payload }) => RoomsAdapter.addOne(payload, state)),
)
