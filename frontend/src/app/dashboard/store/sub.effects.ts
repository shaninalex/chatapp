import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { XmppService } from "../services/xmpp.service";
import { ContactActions, SubsActions } from "./actions";
import { catchError, exhaustMap, map, of } from "rxjs";

@Injectable()
export class SubsribtionEffects {

  subscribed$ = createEffect(() => this.actions$.pipe(
    ofType(SubsActions.approve_sub),
    exhaustMap((action) => this.xmppService.approve_sub(action.from).pipe(
      map(() => SubsActions.subscribed({ id: action.from })),
      catchError(() => of(SubsActions.error({ error: "unable to sub" })))
    ))
  ));

  // afterSubscribed$ = createEffect(() => this.actions$.pipe(
  //   ofType(SubsActions.subscribed),
  //   exhaustMap((action) => this.xmppService.getRoster().pipe(
  //     map(data => ContactActions.set({ list: data.items })),
  //     catchError(() => of(SubsActions.error({ error: "unable to update roster after subscribed" })))
  //   ))
  // ))

  constructor(
    private actions$: Actions,
    private xmppService: XmppService
  ) { }

}
