import { createSelector } from "@ngrx/store";
import { UIState } from "./reducer";
import { AppState } from "..";


export const selectFeature = (state: AppState) => state.ui;

export const selectUserInfoVisibility = createSelector(
    selectFeature,
    (state: UIState) => state.showUserInfo
);

export const selectContactsCompactView = createSelector(
    selectFeature,
    (state: UIState) => state.contactsCompactView
);