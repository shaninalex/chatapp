import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ChatState } from './chat.reducer';
import { IAppState } from '..';


export const selectChatFeature = (state: IAppState) => state.chat;


export const selectContactList = createSelector(
    selectChatFeature,
    state => state.
);

