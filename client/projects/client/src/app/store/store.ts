import { identityReducer, IdentityState } from "./identity/reducer";
import * as identityEffects from './identity/effects'
import { xmppReducer, XmppState } from "./chat/reducer";


export interface AppState {
    identity: IdentityState
    chat: XmppState
}

export const reducers = {
    identity: identityReducer,
    chat: xmppReducer
}

export const effects = [
    identityEffects,
]
