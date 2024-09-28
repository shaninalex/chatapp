import { createSelector } from "@ngrx/store";
import { selectXmppFeature } from "../selectors";
import { XmppState } from "../reducer";
import { UsersAdapter } from "../reducers/users";


export const selectChatUsersFeature = createSelector(
    selectXmppFeature,
    (state: XmppState) => state.users
)

export const selectChatUsersAll = createSelector(
    selectChatUsersFeature,
    UsersAdapter.getSelectors().selectAll
);
