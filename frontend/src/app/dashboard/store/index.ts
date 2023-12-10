import { chatReducer } from "./chat/chat.reducer";
import { IChatState } from "./chat/chat.reducer";
import { combineReducers } from "@ngrx/store";


export interface IAppState {
  chat: IChatState,
}

export const dashboardReducer = combineReducers({
  chat: chatReducer,
});
