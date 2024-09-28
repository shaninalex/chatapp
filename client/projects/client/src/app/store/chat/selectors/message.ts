import { Message } from "@lib";
import { createSelector } from "@ngrx/store";
import { XmppState } from "../reducer";
import { MessagesAdapter } from "../reducers/messages";
import { selectXmppFeature } from "./feature";
import { MessageType } from "stanza/Constants";

export const selectMessagesFeature = createSelector(
    selectXmppFeature,
    (state: XmppState) => state.messages
)

export const selectAllMessages = createSelector(
    selectMessagesFeature,
    MessagesAdapter.getSelectors().selectAll
);

export const selectMessagesByRoom = (jid: string, messageType: MessageType) => createSelector(
    selectAllMessages,
    (messages: Message[]) => messages.filter(message => message.from.startsWith(jid) && message.type === messageType)
);
