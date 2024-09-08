import { createReducer, on } from '@ngrx/store';
import * as IdentityActions from './actions';
import { Profile } from '@lib';
import { LogoutFlow, SettingsFlow } from '@ory/kratos-client';

export interface IdentityState {
    profile: Profile | null
    logout: LogoutFlow | null
    settings: SettingsFlow | null
}

export const initialState: IdentityState = {
    profile: null,
    logout: null,
    settings: null,
};

export const identityReducer = createReducer(
    initialState,
    on(IdentityActions.SetSession, (state, action) => ({ ...state, profile: action.payload })),
    on(IdentityActions.GetLogoutLink, (state, action) => ({ ...state, logout: action.payload })),
    on(IdentityActions.GetSettings, (state, action) => ({ ...state, settings: action.payload })),
);
