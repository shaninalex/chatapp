import { createSelector } from '@ngrx/store';
import { IChatState } from './chat.reducer';
import { IDashboardState } from '..';


export const selectChatFeature = (state: IDashboardState) => state.chat;


export const selectContactList = createSelector(
    selectChatFeature,
    (state: IChatState) => state.contactList
);

