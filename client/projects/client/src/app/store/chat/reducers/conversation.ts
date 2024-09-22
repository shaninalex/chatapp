import { createReducer, createSelector, on } from "@ngrx/store";
import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import * as actions from '../actions';
import { Conversation } from "../def";
import { selectXmppFeature } from "../selectors";
import { XmppState } from "../reducer";

export interface ConversationState extends EntityState<Conversation> { }
export const ConversationAdapter: EntityAdapter<Conversation> = createEntityAdapter<Conversation>({
    selectId: (model: Conversation) => model.jid
});
export const initialRooms: ConversationState = ConversationAdapter.getInitialState();

export const conversationReducer = createReducer(
    initialRooms,
    on(actions.ChatConversationAdd, (state, { payload }) => ConversationAdapter.addOne(payload, state)),
)

export const selectConversationFeature = createSelector(
    selectXmppFeature,
    (state: XmppState) => state.conversations
)

export const selectConversationAll = createSelector(
    selectConversationFeature,
    ConversationAdapter.getSelectors().selectAll
);

export const selectConversationByJid = (jid: string) => createSelector(
    selectConversationAll,
    (conversations: Conversation[]) => conversations.filter(c => c.jid === jid)
);
