import { createAction, props } from "@ngrx/store";
import { Profile } from "@lib";

export const SetSession = createAction(
    "[session] Set",
    props<{ payload: Profile }>()
);
export const SetSessionStart = createAction("[session] Set start");
export const SetSessionEnd = createAction("[session] Set end");
