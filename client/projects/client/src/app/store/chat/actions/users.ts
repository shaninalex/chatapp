import { ChatUser } from "@lib";
import { createAction, props } from "@ngrx/store";

export const ChatUsersAdd = createAction(
    "[chat users] add",
    props<{ payload: ChatUser }>()
)

export const ChatUsersAddMany = createAction(
    "[chat users] add many",
    props<{ payload: ChatUser[] }>()
)

