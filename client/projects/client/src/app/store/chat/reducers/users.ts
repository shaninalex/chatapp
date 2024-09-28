import { ChatUser } from "@lib";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import * as actions from "../actions/users"

export interface ChatUsersState extends EntityState<ChatUser> { }

export const UsersAdapter: EntityAdapter<ChatUser> = createEntityAdapter<ChatUser>({
    selectId: (model: ChatUser) => model.jid
});

export const ChatUsersInitialState: ChatUsersState = UsersAdapter.getInitialState()

export const ChatUsersReducer = createReducer(
    ChatUsersInitialState,
    on(actions.ChatUsersAdd, (state, { payload }) => UsersAdapter.addOne(payload, state)),
    on(actions.ChatUsersAddMany, (state, { payload }) => UsersAdapter.addMany(payload, state)),
)

