import { combineReducers, createFeatureSelector } from "@ngrx/store";
import { SubState, subReducer } from "./sub.reducer";
import { ContactsState, contactsReducer } from "./contacts.reducer";

export interface IDashboardState {
  contacts: ContactsState
  subscriptions: SubState
}

export const selectDashboardFeature = createFeatureSelector<IDashboardState>('dashboard');

export const dashboardReducer = combineReducers({
  contacts: contactsReducer,
  subscriptions: subReducer,
});
