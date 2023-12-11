import { chatReducer } from "./chat/chat.reducer";
import { IChatState } from "./chat/chat.reducer";
import { combineReducers } from "@ngrx/store";


export interface IDashboardState {
  chat: IChatState,
}

export const dashboardReducer = combineReducers({
  chat: chatReducer,
});
