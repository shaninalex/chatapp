import { chatReducer } from "./chat/chat.reducer";
import { IChatState } from "./chat/chat.reducer";
import { combineReducers, createFeatureSelector } from "@ngrx/store";
import { SubState, subReducer } from "./sub.reducers";

export interface IDashboardState {
  chat: IChatState
  subscriptions: SubState
}

export const selectDashboardFeature = createFeatureSelector<IDashboardState>('dashboard');


export const dashboardReducer = combineReducers({
  chat: chatReducer,
  subscriptions: subReducer,
});
