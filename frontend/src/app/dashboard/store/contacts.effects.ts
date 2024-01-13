
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { XmppService } from "../services/xmpp.service";
import { ContactActions } from "./actions";
import { catchError, exhaustMap, map, of } from "rxjs";
import { Contact } from "./contacts.reducer";
import { RosterItem } from "stanza/protocol";

@Injectable()
export class ContactsEffects {

  onGetItems$ = createEffect(() => this.actions$.pipe(
    ofType(ContactActions.remove, ContactActions.get),
    exhaustMap(() => this.xmppService.getRoster().pipe(
      map((data) => {
        const list: Contact[] = data.items.map((item: RosterItem) => {
          const contact: Contact = { id: item.jid, jid: item.jid, photo: undefined, fullName: undefined };
          return contact;
        })
        return ContactActions.set({ list })
      }),
      catchError((error) => {
        console.log(error);
        return of(ContactActions.error({ error: "unable to set contacts" }))
      })
    ))
  ));

  constructor(
    private actions$: Actions,
    private xmppService: XmppService
  ) { }

}
