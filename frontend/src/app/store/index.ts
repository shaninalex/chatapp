import { IdentityState, identityReducer } from "./identity/reducer";
import { chatReducer } from "./chat/chat.reducer";
import { IChatState } from "./chat/chat.reducer";


export interface IAppState {
    identity: IdentityState,
    chat: IChatState,
}

export const AppState = {
    identity: identityReducer,
    chat: chatReducer,
}