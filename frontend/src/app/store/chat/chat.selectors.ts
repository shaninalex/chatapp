import { createSelector } from '@ngrx/store';
import { IChatState } from './chat.reducer';
import { IAppState } from '..';


export const selectChatFeature = (state: IAppState) => state.chat;


export const selectContactList = createSelector(
    selectChatFeature,
    (state: IChatState) => state.contactList
);

