import { createReducer, on } from '@ngrx/store';
import { UIActions } from './actions';


export interface UIState {
    showUserInfo: boolean
    contactsCompactView: boolean
}

export const initialState: UIState = {
    showUserInfo: false,
    contactsCompactView: false
};

export const uiReducer = createReducer(
    initialState,
    on(UIActions.toggleUserInfo, _state => {
        return {
            ..._state,
            showUserInfo: !_state.showUserInfo
        }
    }),
    on(UIActions.toggleContactsCompactView, _state => {
        return {
            ..._state,
            contactsCompactView: !_state.contactsCompactView
        }
    })
);
