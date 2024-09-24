import { Component, Input } from "@angular/core";
import { Conv } from "@lib";
import { Observable } from "rxjs";

@Component({
    selector: "app-conversation-area",
    templateUrl: "./conversation-area.component.html"
})
export class ConversationAreaComponent {
    @Input() conversation$: Observable<Conv>
}