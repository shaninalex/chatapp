import { ChatUser } from "@lib";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import * as actions from "../actions/users"
import { fillState, MOCK_CHAT_STORE } from "../mock-store";

export interface ChatUsersState extends EntityState<ChatUser> { }

export const UsersAdapter: EntityAdapter<ChatUser> = createEntityAdapter<ChatUser>({
    selectId: (model: ChatUser) => model.jid
});

export const ChatUsersInitialState: ChatUsersState = fillState<ChatUser>(UsersAdapter, MOCK_CHAT_STORE.users)

export const ChatUsersReducer = createReducer(
    ChatUsersInitialState,
    on(actions.ChatUsersAdd, (state, { payload }) => UsersAdapter.addOne(payload, state)),
    on(actions.ChatUsersAddMany, (state, { payload }) => UsersAdapter.addMany(payload, state)),
)

