import { createAction, createActionGroup, props } from "@ngrx/store";
import { Sub } from "./sub.reducers";


export const SubsActions = createActionGroup({
  source: "subscribe",
  events: {
    new: props<{ sub: Sub }>(),
    error: props<{ error: string }>(),
    approve_sub: props<{ from: string }>(),
    subscribed: props<{ id: string }>(),
  }
})
