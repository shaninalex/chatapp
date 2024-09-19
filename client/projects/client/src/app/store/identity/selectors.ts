import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IdentityState } from "./reducer";

export const selectIdentityFeature = createFeatureSelector<IdentityState>('identity');

export const selectProfile = createSelector(
    selectIdentityFeature,
    (state: IdentityState) => state.profile
)

export const selectIdentity = createSelector(
    selectIdentityFeature,
    (state: IdentityState) => state.profile?.identity
)

export const selectLogoutLink = createSelector(
    selectIdentityFeature,
    (state: IdentityState) => state.logout
)

export const selectSettings = createSelector(
    selectIdentityFeature,
    (state: IdentityState) => state.settings
)
