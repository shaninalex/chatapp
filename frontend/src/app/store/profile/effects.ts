import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of, tap } from "rxjs";
import { Profile } from "src/app/typedefs";
import { ProfileService } from "src/app/services/profile.service";
import { ProfileActions } from "./actions";


@Injectable()
export class ProfileEffects {

    constructor(
        private action$: Actions,
        private profileService: ProfileService
    ) { }

    userStart$ = createEffect(() => this.action$.pipe(
        ofType(ProfileActions.getUserStart),
        exhaustMap(() =>
            this.profileService.getProfile().pipe(
                map((user: Profile) => ProfileActions.getUserSuccess({ user: user })),
                catchError(() => {
                    return of(ProfileActions.getUserError({ error: "Unable to get user" }))
                })
            )
        )
    ));

    userSucces$ = createEffect(() => this.action$.pipe(
        ofType(ProfileActions.getUserSuccess),
        tap(action_type => {
            return of(action_type);
        })
    ), { dispatch: false });
}