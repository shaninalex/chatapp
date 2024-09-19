import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import * as actions from '../actions';
import { ReceivedMessage } from "stanza/protocol";
import { XmppState } from "../reducer";
import { selectXmppFeature } from "../selectors";

export interface MessagesState extends EntityState<ReceivedMessage> { }
export const MessagesAdapter: EntityAdapter<ReceivedMessage> = createEntityAdapter<ReceivedMessage>();
export const initialMessages: MessagesState = MessagesAdapter.getInitialState();

export const messagesReducer = createReducer(
    initialMessages,
    on(actions.ChatMessageAdd, (state, { payload }) => MessagesAdapter.addOne(payload, state)),
)

export const selectMessagesFeature = createSelector(
    selectXmppFeature,
    (state: XmppState) => state.messages
)

export const selectAllMessages = createSelector(
    selectMessagesFeature,
    MessagesAdapter.getSelectors().selectAll
);

export const selectMessagesByRoom = (jid: string) => createSelector(
    selectAllMessages,
    (messages: ReceivedMessage[]) => messages.filter(message => message.from.startsWith(jid))
);
