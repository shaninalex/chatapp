import { createReducer, on } from '@ngrx/store';
import { ProfileActions } from './actions';


export interface ProfileState {
    loading: boolean
    profile: any
    error: string|null
}

export const initialState: ProfileState = {
    loading: false,
    profile: {},
    error: null
};

export const profileReducer = createReducer(
    initialState,
    on(ProfileActions.getUserStart, _state => {
        return {
            ..._state,
            loading: true
        }
    }),
    on(ProfileActions.getUserSuccess, (_state, action) => {
        return {
            error: null,
            loading: false,
            profile: action.user
        }
    }),
    on(ProfileActions.getUserError, (_state, action) => {
        return {
            ..._state,
            loading: false,
            error: action.error
        }
    }),
);
