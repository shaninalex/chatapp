import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity"
import { createReducer, on } from "@ngrx/store"
import { SubsActions } from "./actions"

export interface Sub {
  id: string
  from: string
  lang: string
  to: string
  priority: number
  type: string
}

export interface SubState extends EntityState<Sub> { }
export const subAdapter: EntityAdapter<Sub> = createEntityAdapter<Sub>();
export const initialSubState: SubState = subAdapter.getInitialState();

export const subReducer = createReducer(
  initialSubState,
  on(SubsActions.new, (state, action) => subAdapter.addOne(action.sub, state))
);

const {
  selectAll
} = subAdapter.getSelectors();

export const allSubscriptions = selectAll;
