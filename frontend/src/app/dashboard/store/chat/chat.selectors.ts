import { createSelector } from '@ngrx/store';
import { IChatState } from './chat.reducer';
import { IDashboardState } from '..';


export const selectChatFeature = (state:any) => state.dashboard.chat;


export const selectContactList = createSelector(
    selectChatFeature,
    (state: IChatState) => state.contactList
);

export const selectConversation = createSelector(
    selectChatFeature,
    (state: IChatState) => state.activeConversation
);

