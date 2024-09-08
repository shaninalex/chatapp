import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as actions from "./actions";
import { EMPTY, catchError, exhaustMap, map } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
// import { UiService } from "@ui";
import { ApiResponse, Profile } from "@lib";
import { LogoutFlow, SettingsFlow } from "@ory/kratos-client";


export const loadIdentity = createEffect(
    (
        actions$ = inject(Actions),
        http = inject(HttpClient),
        router = inject(Router),
        // ui = inject(UiService)
    ) => {
        return actions$.pipe(
            ofType(actions.SetSessionStart.type),
            exhaustMap(() => http.get<ApiResponse<Profile>>("/api/profile/me", { withCredentials: true }).pipe(
                map((data: ApiResponse<Profile>) => {
                    return actions.SetSession({ payload: data.data })
                }),
                catchError((error: HttpErrorResponse) => {
                    // this.ui.addSimpleToast(error.message, true);
                    switch (error.status) {
                        // server routes configured incorrectly
                        case 404:
                            router.navigate(['/404'])
                            break;

                        // session is outdated or user is unauthorized. Required to login again
                        case 401:
                            router.navigate(['/auth/login'])
                            break;
                        default:
                            null
                    }

                    actions.SetSessionEnd();
                    return EMPTY;
                }),
            ))
        )
    },
    { functional: true, dispatch: true }
);


export const getLogoutLink = createEffect(
    (
        actions$ = inject(Actions),
        http = inject(HttpClient),
        router = inject(Router),
        // ui = inject(UiService)
    ) => {
        return actions$.pipe(
            ofType(actions.GetLogoutLinkStart.type),
            exhaustMap(() => http.get<ApiResponse<LogoutFlow>>("/api/profile/logout", { withCredentials: true }).pipe(
                map((data: ApiResponse<LogoutFlow>) => {
                    return actions.GetLogoutLink({ payload: data.data })
                }),
                catchError((error: HttpErrorResponse) => {
                    // this.ui.addSimpleToast(error.message, true);
                    switch (error.status) {
                        // server routes configured incorrectly
                        case 404:
                            router.navigate(['/404'])
                            break;

                        // session is outdated or user is unauthorized. Required to login again
                        case 401:
                            router.navigate(['/auth/login'])
                            break;
                        default:
                            null
                    }

                    actions.GetLogoutLinkEnd();
                    return EMPTY;
                }),
            ))
        )
    },
    { functional: true, dispatch: true }
);


export const getSettings = createEffect(
    (
        actions$ = inject(Actions),
        http = inject(HttpClient),
        router = inject(Router),
        // ui = inject(UiService)
    ) => {
        return actions$.pipe(
            ofType(actions.GetSettingsStart.type),
            exhaustMap(() => http.get<ApiResponse<SettingsFlow>>("/api/profile/settings", { withCredentials: true }).pipe(
                map((data: ApiResponse<SettingsFlow>) => {
                    return actions.GetSettings({ payload: data.data })
                }),
                catchError((error: HttpErrorResponse) => {
                    // this.ui.addSimpleToast(error.message, true);
                    switch (error.status) {
                        // server routes configured incorrectly
                        case 404:
                            router.navigate(['/404'])
                            break;

                        // session is outdated or user is unauthorized. Required to login again
                        case 401:
                            router.navigate(['/auth/login'])
                            break;
                        default:
                            null
                    }

                    actions.GetSettingsEnd();
                    return EMPTY;
                }),
            ))
        )
    },
    { functional: true, dispatch: true }
);
