import { createReducer, on } from "@ngrx/store";
import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import * as actions from '../actions/message';
import { Message } from "@lib";
import { fillState, MOCK_CHAT_STORE } from "../mock-store";

export interface MessagesState extends EntityState<Message> { }

export const MessagesAdapter: EntityAdapter<Message> = createEntityAdapter<Message>();

export const InitialMessages: MessagesState = fillState<Message>(MessagesAdapter, MOCK_CHAT_STORE.messages)

export const MessagesReducer = createReducer(
    InitialMessages,
    on(actions.ChatMessageAdd, (state, { message }) => MessagesAdapter.addOne(message, state)),
)
