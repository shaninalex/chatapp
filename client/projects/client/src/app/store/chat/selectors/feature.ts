import { createFeatureSelector } from "@ngrx/store";
import { XmppState } from "../reducer";

export const selectXmppFeature = createFeatureSelector<XmppState>('chat');
