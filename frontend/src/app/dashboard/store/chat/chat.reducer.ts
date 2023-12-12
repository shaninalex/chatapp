import { createReducer, on } from '@ngrx/store';
import * as chatActions from './chat.actions';
// import { RosterItem } from 'stanza/protocol';

export interface IChatState {
    contactList: any[]; // RosterItem
    activeConversation: string | null
}

export const initialState: IChatState = {
    contactList: [],
    activeConversation: null
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
                    if (record.type === "photo") {
                        item.photo = record.data
                    }
                })
            }
            return item
        })
    })),
    on(chatActions.selectConversation, (state, action) => ({...state, activeConversation: action.jid}))
);