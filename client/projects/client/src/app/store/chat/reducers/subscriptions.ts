import { createReducer, createSelector, on } from "@ngrx/store";
import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import * as actions from '../actions';
import { ReceivedPresence } from "stanza/protocol";
import { selectXmppFeature } from "../selectors";
import { XmppState } from "../reducer";

export interface SubscriptionState extends EntityState<ReceivedPresence> { }
export const SubscriptionsAdapter: EntityAdapter<ReceivedPresence> = createEntityAdapter<ReceivedPresence>({
    selectId: (model: ReceivedPresence) => model.from
});
export const initialSubscriptions: SubscriptionState = SubscriptionsAdapter.getInitialState();

export const contactsReducer = createReducer(
    initialSubscriptions,
    on(actions.ChatSubscriptionAdd, (state, { payload }) => SubscriptionsAdapter.addOne(payload, state)),
    // change contact state
)

export const selectSubscriptionsFeature = createSelector(
    selectXmppFeature,
    (state: XmppState) => state.subscriptions
)

export const selectSubscriptionsAll = createSelector(
    selectSubscriptionsFeature,
    SubscriptionsAdapter.getSelectors().selectAll
);
