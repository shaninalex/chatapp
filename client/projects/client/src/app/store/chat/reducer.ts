import { combineReducers } from '@ngrx/store';
import { roomsReducer, RoomsState } from './reducers/rooms';
import { messagesReducer, MessagesState } from './reducers/messages';

export interface XmppState {
    rooms: RoomsState
    messages: MessagesState
}

export const xmppReducer = combineReducers({
    rooms: roomsReducer,
    messages: messagesReducer,
});
