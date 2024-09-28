import { combineReducers } from '@ngrx/store';
import { RoomsReducer, RoomsState } from './reducers/rooms';
import { MessagesReducer, MessagesState } from './reducers/messages';
import { ChatUsersReducer, ChatUsersState } from './reducers/users';
import { ParticipantsReducer, ParticipantsState } from './reducers/participants';

export interface XmppState {
    rooms: RoomsState
    messages: MessagesState
    users: ChatUsersState
    participants: ParticipantsState
}

export const xmppReducer = combineReducers({
    rooms: RoomsReducer,
    messages: MessagesReducer,
    users: ChatUsersReducer,
    participants: ParticipantsReducer
});
