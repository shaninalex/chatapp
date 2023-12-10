import { createReducer, on } from '@ngrx/store';
import * as chatActions from './chat.actions';
import { RosterItem } from 'stanza/protocol';

export interface IChatState {
    contactList: RosterItem[];
}

export const initialState: IChatState = {
    contactList: [],
};

export const chatReducer = createReducer(
    initialState,
    on(chatActions.setContactsList, (state, action) => ({ ...state, contactList: action.list })),
);