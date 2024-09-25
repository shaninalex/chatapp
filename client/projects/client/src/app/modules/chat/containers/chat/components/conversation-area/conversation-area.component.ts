import { Component, Input } from "@angular/core";
import { Conv } from "@lib";
import { Observable } from "rxjs";

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
    @Input() conversation$: Observable<Conv>
}
