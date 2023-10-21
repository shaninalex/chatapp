import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { ProfileActions } from "./profile.action-types";
import { catchError, exhaustMap, map, of, tap } from "rxjs";
import { Router } from "@angular/router";
import { ProfileService } from "src/app/base_services/profile.service";
import { Profile } from "src/app/typedefs";


@Injectable()
export class ProfileEffects {

    constructor(
        private action$: Actions,
        private router: Router,
        private profileService: ProfileService
    ) { }

    userStart$ = createEffect(() => this.action$.pipe(
        ofType(ProfileActions.getProfileStart),
        exhaustMap(() =>
            this.profileService.getProfile().pipe(
                map((user: Profile) => ProfileActions.getProfileSuccess({ payload: user })),
                catchError(() => {
                    return of(ProfileActions.getProfileError({ payload: "Unable to get user" }))
                })
            )
        )
    ));

    userSucces$ = createEffect(() => this.action$.pipe(
        ofType(ProfileActions.getProfileSuccess),
        tap(action_type => {
            return of(action_type);
        })
    ), { dispatch: false });
}
