import { createAction, props } from "@ngrx/store";
import { RosterItem, VCardTemp } from "stanza/protocol";


export const setContactsList = createAction(
  "[Chat] set contact list",
  props<{ list: RosterItem[] }>()
);

export const setVCardItem = createAction(
  "[Chat] set vcard item",
  props<{ jid: string, vcard: VCardTemp }>()
)

export const selectConversation = createAction(
  "[Chat] select conversation",
  props<{ jid: string }>()
)

export const newMessage = createAction(
  "[Chat] new message",
  props<{message: ChatMessage}>()
);
