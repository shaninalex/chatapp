import { createAction, props } from "@ngrx/store";
import { IdentityObject } from "../../typedefs/identity";


export const SetIdentity = createAction(
    "[identity] Set",
    props<{user_info: IdentityObject}>()
);