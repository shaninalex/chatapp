import { createReducer, on } from '@ngrx/store';
import * as IdentityActions from './actions';
import { Profile } from '@lib';

export interface IdentityState {
    profile: Profile | null
}

export const initialState: IdentityState = {
    profile: null,
};

export const identityReducer = createReducer(
    initialState,
    on(IdentityActions.SetSession, (state, action) => ({
        ...state,
        ...action.payload
    })),
);
