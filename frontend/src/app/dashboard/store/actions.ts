import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Sub } from "./sub.reducer";
import { RosterItem } from "stanza/protocol";


export const SubsActions = createActionGroup({
  source: "subscribe",
  events: {
    new: props<{ sub: Sub }>(),
    error: props<{ error: string }>(),
    approve_sub: props<{ from: string }>(),
    subscribed: props<{ id: string }>(),
  }
})

export const ContactActions = createActionGroup({
  source: "contact",
  events: {
    get: emptyProps(),
    set: props<{ list: any[] }>(),
    set_vcard: props<{ jid: string, vcard: any }>(),
    remove: props<{ id: string }>(),
    error: props<{ error: string }>(),
  }
});
