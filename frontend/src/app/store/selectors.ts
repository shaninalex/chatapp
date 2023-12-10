import { createSelector } from '@ngrx/store';
import { IAppState } from './appstate';


export const selectIdentityFeature = (state: IAppState) => state.identity;


export const selectTraits = createSelector(
    selectIdentityFeature,
    state => state.identity?.identity.traits
);
