import { RoomParticipant } from "@lib";
import { Update } from "@ngrx/entity";
import { createAction, props } from "@ngrx/store";

export const ChatParticipantsAdd = createAction(
    "[chat participants] add",
    props<{ participant: RoomParticipant }>()
)

export const ChatParticipantsAddMany = createAction(
    "[chat participants] add many",
    props<{ participants: RoomParticipant[] }>()
)

export const ChatParticipantsUpdate = createAction(
    "[chat participants] update",
    props<{ update: Update<RoomParticipant> }>()
)

export const ChatParticipantsAddRemove = createAction(
    "[chat participants] remove",
    props<{ id: string }>()
)
