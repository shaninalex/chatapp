import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import * as chatActions from './chat.actions';
import { XmppService } from '../../services/xmpp.service';

@Injectable()
export class ChatEffects {

  getVCards$ = createEffect(() => this.actions$.pipe(
    ofType(chatActions.setContactsList),
    map(items => {
      items.list.forEach(item => this.xmpp.getVCard(item.jid))
      return items.list;
    })
  ), { dispatch: false })

  constructor(
    private actions$: Actions,
    private xmpp: XmppService
  ) { }
}
