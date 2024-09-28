import { Component } from "@angular/core";
import { Message, Room, RoomType } from "@lib";
import { filter, Observable, of, switchMap } from "rxjs";
import { AppState } from "../../../../store/store";
import { Store } from "@ngrx/store";
import { ActivatedRoute } from "@angular/router";
import { selectMessagesByRoom, selectRoomByJID } from "../../../../store/chat/selectors";
import { ChatRoomsSelect } from "../../../../store/chat/actions";

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
    room$: Observable<Room>;
    messages$: Observable<Message[]>;

    constructor(
        private store: Store<AppState>,
        private route: ActivatedRoute
    ) {
        this.messages$ = this.route.params.pipe(
            switchMap(params => {
                if (!params["id"]) return of([])
                this.store.dispatch(ChatRoomsSelect({ payload: { 
                    id: params["id"],
                    changes: { selected: true }
                }}))
                return this.store.select(selectMessagesByRoom(params["id"]))
            }),
        );

        this.room$ = this.route.params.pipe(
            switchMap(params => this.store.select(selectRoomByJID(params['id']))),
            filter((room: Room | undefined) => !!room),
        );
    }

    isPubSub(roomType: RoomType): boolean {
        return roomType !== RoomType.pubsub;
    }
}
