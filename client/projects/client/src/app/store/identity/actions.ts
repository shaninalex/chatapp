import { createAction, props } from "@ngrx/store";
import { LogoutFlow, SettingsFlow } from "@ory/kratos-client";
import { Profile } from "@lib";

export const SetSession = createAction(
    "[session] Set",
    props<{ payload: Profile }>()
);
export const SetSessionStart = createAction("[session] Set start");
export const SetSessionEnd = createAction("[session] Set end");

export const GetLogoutLink = createAction(
    "[logout link] set",
    props<{ payload: LogoutFlow }>()
);
export const GetLogoutLinkStart = createAction("[logout link] start");
export const GetLogoutLinkEnd = createAction("[logout link] end");

export const GetSettings = createAction(
    "[settings] set",
    props<{ payload: SettingsFlow }>()
);
export const GetSettingsStart = createAction("[settings] start");
export const GetSettingsEnd = createAction("[settings] end");
