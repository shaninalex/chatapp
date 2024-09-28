import { Component, Input } from "@angular/core";
import { conversation_1, UiChatMessage, UiConv } from "@lib";
import { UiService } from "@ui";
import { BehaviorSubject, Observable, take, tap } from "rxjs";
import { AppState } from "../../../../store/store";
import { Store } from "@ngrx/store";
import { ActivatedRoute } from "@angular/router";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

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
    @Input() conversation$: Observable<UiConv>
    conversation_1: UiChatMessage[] = conversation_1;

    constructor(
        private ui: UiService,
        private store: Store<AppState>,
        private route: ActivatedRoute
    ) {
        this.route.params.pipe(
            take(1),
            tap(params => {
                if (!params["id"]) return
            }),
            // switch map and select room
            takeUntilDestroyed()
        ).subscribe()
    }
}
