import { Message } from "@lib";
import { createAction, props } from "@ngrx/store";

export const ChatMessageAdd = createAction(
    "[chat message] add",
    props<{ message: Message }>()
)