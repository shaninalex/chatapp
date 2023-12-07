import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { ChatState } from "stanza/Constants";
import { selectContactList } from "../../../store/chat/chat.selectors";

@Component({
    selector: "app-sidebar",
    templateUrl: "sidebar.component.html"
})
export class SidebarComponent {
    users: any[];


    constructor(
        private store: Store<ChatState>
    ) {
        this.store.select(selectContactList).subscribe({
            next: data => {
                console.log(data);
            }
        })
    }


}