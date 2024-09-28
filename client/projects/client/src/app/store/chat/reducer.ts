import { combineReducers } from '@ngrx/store';
import { roomsReducer, RoomsState } from './reducers/rooms';
import { messagesReducer, MessagesState } from './reducers/messages';
import { chatUsersReducer, ChatUsersState } from './reducers/chat-users';

export interface XmppState {
    rooms: RoomsState
    messages: MessagesState
    users: ChatUsersState
}

export const xmppReducer = combineReducers({
    rooms: roomsReducer,
    messages: messagesReducer,
    users: chatUsersReducer
});
