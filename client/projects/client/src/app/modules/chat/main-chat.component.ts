import { Component } from "@angular/core";
import { UiService } from "@ui";
import { Observable } from "rxjs";

@Component({
    selector: "app-chat",
    templateUrl: "./main-chat.component.html"
})
export class MainChatComponent {
    loading$: Observable<boolean>

    constructor(
        private ui: UiService,
    ) {
        this.ui.title.next("Chat");
        this.loading$ = this.ui.appLoading.asObservable();
    }

}
