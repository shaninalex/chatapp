import { createReducer, on } from "@ngrx/store";
import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import * as actions from '../actions';
import { Conversation } from "../def";

export interface ConversationState extends EntityState<Conversation> { }
export const ConversationAdapter: EntityAdapter<Conversation> = createEntityAdapter<Conversation>({
    selectId: (model: Conversation) => model.jid
});
export const initialRooms: ConversationState = ConversationAdapter.getInitialState();

export const conversationReducer = createReducer(
    initialRooms,
    on(actions.ChatConversationAdd, (state, { conversation }) => ConversationAdapter.addOne(conversation, state)),
)
