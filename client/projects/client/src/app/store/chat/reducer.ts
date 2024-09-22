import { combineReducers } from '@ngrx/store';
import { roomsReducer, RoomsState } from './reducers/rooms';
import { messagesReducer, MessagesState } from './reducers/messages';
import { participantsReducer, ParticipantsState } from './reducers/participants';
import { conversationReducer, ConversationState } from './reducers/conversation';

export interface XmppState {
    rooms: RoomsState
    messages: MessagesState
    participants: ParticipantsState
    conversations: ConversationState
}

export const xmppReducer = combineReducers({
    rooms: roomsReducer,
    messages: messagesReducer,
    participants: participantsReducer,
    conversations: conversationReducer,
});
