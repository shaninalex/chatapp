import { createSelector } from "@ngrx/store";
import { IDashboardState, selectDashboardFeature } from "./store";
import { allSubscriptions } from "./sub.reducers";


export const selectSubsState = createSelector(
    selectDashboardFeature,
    (state: IDashboardState) => state.subscriptions
);

export const selectSubsList = createSelector(
    selectSubsState,
    allSubscriptions
)