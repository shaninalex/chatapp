import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as actions from "./actions";
import { EMPTY, catchError, exhaustMap, finalize, first, map, of, switchMap } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { ApiResponse, Profile } from "@lib";
import { LogoutFlow, SettingsFlow } from "@ory/kratos-client";
import { XmppService } from "../../lib/services/xmpp.service";
import { environment } from "../../../environments/environment.development";
import { UserService } from "../../lib/services/user.service";
import { UiService } from "@ui";


export const loadIdentity = createEffect(
    (
        actions$ = inject(Actions),
        http = inject(HttpClient),
        router = inject(Router),
        xmpp = inject(XmppService),
        user = inject(UserService),
        ui = inject(UiService),
    ) => {
        return actions$.pipe(
            ofType(actions.SetSessionStart.type),
            exhaustMap(() => http.get<ApiResponse<Profile>>("/api/profile/me", { withCredentials: true }).pipe(
                switchMap((data: ApiResponse<Profile>) => {
                    const token = data.data.token.token;
                    const id = data.data.identity.id;
                    return xmpp.connected$.pipe(
                        first(),
                        switchMap((connected: boolean) => {
                            if (!connected) {
                                return xmpp.connect(id, token, environment.XMPP_WEBSOCKET_ADDRESS).pipe(
                                    map(() => {
                                        user.setProfile(data.data)      
                                        return actions.SetSession({ payload: data.data })
                                    })
                                );
                            }
                            return of(actions.SetSession({ payload: data.data }));
                        })
                    );
                }),

                // Error handling
                catchError((error: HttpErrorResponse) => {
                    switch (error.status) {
                        case 404:
                            router.navigate(['/404']);
                            break;
                        case 401:
                            router.navigate(['/auth/login']);
                            break;
                        default:
                            null;
                    }

                    return of(actions.SetSessionEnd());
                }),

                finalize(() => ui.appLoading.next(false))
            ))
        );
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
