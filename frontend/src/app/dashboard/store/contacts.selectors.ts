import { createSelector } from "@ngrx/store";
import { IDashboardState, selectDashboardFeature } from "./store";
import { allContacts } from "./contacts.reducer";


export const selectContactsState = createSelector(
  selectDashboardFeature,
  (state: IDashboardState) => state.contacts
);

export const selectContactsList = createSelector(
  selectContactsState,
  allContacts
)
