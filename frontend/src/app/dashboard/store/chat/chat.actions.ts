import { createAction, props } from "@ngrx/store";
import { RosterItem } from "stanza/protocol";


export const setContactsList = createAction(
    "[Chat] set contact list",
    props<{list: RosterItem[]}>()
);