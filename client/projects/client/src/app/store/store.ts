import { identityReducer, IdentityState } from "./identity/reducer";
import * as identityEffects from './identity/effects'

export interface AppState {
    identity: IdentityState
}

export const reducers = {
    identity: identityReducer,
}

export const effects = [
    identityEffects,
]
