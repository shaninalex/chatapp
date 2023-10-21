import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProfileState } from "./profile.reducer";

export const selectProfileState = createFeatureSelector<ProfileState>("profile");

export const selectProfile = createSelector(
    selectProfileState,
    app => app.profile
);

export const selectProfileObj = createSelector(
    selectProfile,
    profile_obj => profile_obj
);

export const selectProfileExists = createSelector(
    selectProfile,
    profile_obj => !!profile_obj
);
