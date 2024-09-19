import { combineReducers } from '@ngrx/store';
import { roomsReducer, RoomsState } from './reducers/rooms';
import { messagesReducer, MessagesState } from './reducers/messages';
import { participantsReducer, ParticipantsState } from './reducers/participants';

export interface XmppState {
    rooms: RoomsState
    messages: MessagesState
    participants: ParticipantsState
}

export const xmppReducer = combineReducers({
    rooms: roomsReducer,
    messages: messagesReducer,
    participants: participantsReducer,
});
