import { createReducer, on } from '@ngrx/store';
import * as chatActions from './chat.actions';
import { ChatMessage } from '../../services/xmpp.service';
// import { RosterItem } from 'stanza/protocol';

export interface IConversation {
    id: string
    authors: Array<any>
    messages: Array<ChatMessage>
}

export interface IChatState {
    contactList: Array<any> // RosterItem
    activeConversation: string | null
    conversations: Array<IConversation>
}

export const initialState: IChatState = {
    contactList: [],
    activeConversation: null,
    conversations: []
};

export const chatReducer = createReducer(
    initialState,
    on(chatActions.setContactsList, (state, action) => ({ ...state, contactList: action.list })),
    on(chatActions.setVCardItem, (state, action) => ({
        ...state,
        contactList: state.contactList.map(item => {
            if (item.jid === action.jid) {
                item = { 
                    ...item, 
                    fullname: action.vcard.fullName,
                }
                action.vcard.records?.forEach(record => {
                    if (record.type === "url") {
                        item.photo = record.value
                    }
                })
            }
            return item
        })
    })),
    on(chatActions.selectConversation, (state, action) => ({...state, activeConversation: action.jid}))
);