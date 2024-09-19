import { createFeatureSelector } from "@ngrx/store";
import { XmppState } from "./reducer";

// selectors
export const selectXmppFeature = createFeatureSelector<XmppState>('chat');
