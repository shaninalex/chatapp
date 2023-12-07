import { createAction, props } from "@ngrx/store";


export const setContactsList = createAction(
    "[Chat] set contact list",
    props<{list: any}>()
);