import { Component } from "@angular/core";
import { UiService } from "@ui";

@Component({
    selector: "no-chat-selected",
    template: `
<div class="border rounded-lg p-7 text-slate-800 h-full">
    No chat selected
</div>
`
})
export class NoChatSelectedComponent {

    constructor(private ui: UiService) {
        this.ui.selectedConversation$.next(null);
    }
}

