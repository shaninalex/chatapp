import { createSelector } from '@ngrx/store';
import { IAppState } from '..';
import { IdentityState } from './reducer';


export const selectIdentityFeature = (state: IAppState) => state.identity;


export const selectTraits = createSelector(
    selectIdentityFeature,
    state => {
        return state.identity?.identity.traits
    }
);