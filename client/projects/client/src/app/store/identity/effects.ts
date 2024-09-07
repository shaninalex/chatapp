import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { SetSession, SetSessionStart, SetSessionEnd } from "./actions";
import { EMPTY, catchError, exhaustMap, map } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
// import { UiService } from "@ui";
import { ApiResponse, Profile } from "@lib";


export const loadIdentity = createEffect(
    (
        actions$ = inject(Actions),
        http = inject(HttpClient),
        router = inject(Router),
        // ui = inject(UiService)
    ) => {
        return actions$.pipe(
            ofType(SetSessionStart.type),
            exhaustMap(() => http.get<ApiResponse<Profile>>("/api/profile/me", { withCredentials: true }).pipe(
                map((data: ApiResponse<Profile>) => {
                    return SetSession({ payload: data.data })
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

                    SetSessionEnd();
                    return EMPTY;
                }),
            ))
        )
    },
    { functional: true, dispatch: true }
);

