import { combineReducers } from '@ngrx/store';
import { roomsReducer, RoomsState } from './reducers/rooms';

export interface XmppState {
    rooms: RoomsState,
}

export const xmppReducer = combineReducers({
    rooms: roomsReducer
});
