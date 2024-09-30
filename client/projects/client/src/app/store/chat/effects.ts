import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ChatRoomsAdd } from "./actions";
import { inject } from "@angular/core";
import { exhaustMap, map, of, switchMap } from "rxjs";
import { XmppService } from "../../lib/services/xmpp.service";
import { UserService } from "../../lib/services/user.service";

export const addChatRoom = createEffect(
    (
        actions$ = inject(Actions),
        xmppService = inject(XmppService),
        userService = inject(UserService)
    ) => {
        return actions$.pipe(
            ofType(ChatRoomsAdd),
            exhaustMap(({ payload }) =>
                xmppService.sendPresenceRoom(payload.jid, userService.username).pipe(
                    switchMap(() => xmppService.getRoomItems(payload.jid)),
                )
            )
        );
    },
    { functional: true }
);