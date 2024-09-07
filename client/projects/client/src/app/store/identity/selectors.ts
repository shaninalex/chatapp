import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IdentityState } from "./reducer";

export const selectIdentityFeature = createFeatureSelector<IdentityState>('identity');

export const selectProfile = createSelector(
    selectIdentityFeature,
    (state: IdentityState) => state.profile
)
