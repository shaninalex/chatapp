import { createReducer, on } from '@ngrx/store';
import * as chatActions from './chat.actions';

export interface IChatState {
    contactList: any | null;
}

export const initialState: IChatState = {
    contactList: null,
};

export const chatReducer = createReducer(
    initialState,
    on(chatActions.setContactsList, (state, action) => ({ ...state, contactList: action.list })),
);