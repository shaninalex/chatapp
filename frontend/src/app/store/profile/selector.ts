import { createSelector } from "@ngrx/store";
import { AppState } from "..";
import { ProfileState } from "./reducer";


export const selectFeature = (state: AppState) => state.profile;

export const selectProfile = createSelector(
    selectFeature,
    (state: ProfileState) => state.profile
);
