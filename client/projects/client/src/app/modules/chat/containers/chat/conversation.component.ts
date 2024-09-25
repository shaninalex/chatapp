import {Component} from "@angular/core";
import {UiService} from "@ui";

@Component({
    selector: 'app-conversation',
    templateUrl: './conversation.component.html'
})
export class ConversationComponent {
    constructor(
        private ui: UiService,
    ) {
        this.ui.title.next("Chat");
    }
}
