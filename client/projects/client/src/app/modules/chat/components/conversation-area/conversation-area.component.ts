import { Component } from "@angular/core";
import { Message, Room } from "@lib";
import { filter, Observable, of, switchMap } from "rxjs";
import { AppState } from "../../../../store/store";
import { Store } from "@ngrx/store";
import { ActivatedRoute } from "@angular/router";
import { selectMessagesByRoom, selectRoomsByJID } from "../../../../store/chat/selectors";

/**
 * @description
 * ConversationArea component responsible for chat itself.
 * It can be:
 * - room ( group ) multiuser chat ( XMPP MUC ),
 * - room private chat ( when you chatting with the person from the room, but it may be not in your contact list.
 */
@Component({
    selector: "app-conversation-area",
    templateUrl: "./conversation-area.component.html"
})
export class ConversationAreaComponent {
    room$: Observable<Room | undefined>;
    messages$: Observable<Message[]>;

    constructor(
        private store: Store<AppState>,
        private route: ActivatedRoute
    ) {
        this.messages$ = this.route.params.pipe(
            switchMap(params => {
                if (!params["id"]) return of([])
                return this.store.select(selectMessagesByRoom(params["id"]))
            }),
        );

        this.room$ = this.route.params.pipe(
            switchMap(params => this.store.select(selectRoomsByJID(params['id']))),
            filter((room: Room | undefined) => !!room),
        );
    }
}
