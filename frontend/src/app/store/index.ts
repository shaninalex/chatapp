import { ChatState } from "stanza/Constants";
import { IdentityState, identityReducer } from "./identity/reducer";
import { chatReducer } from "./chat/chat.reducer";


export interface IAppState {
    identity: IdentityState,
    chat: ChatState,
}

export const AppState = {
    identity: identityReducer,
    chat: chatReducer,
}