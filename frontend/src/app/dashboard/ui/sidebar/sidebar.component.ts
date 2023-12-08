import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { selectContactList } from "../../../store/chat/chat.selectors";
import { IAppState } from "../../../store";

@Component({
    selector: "app-sidebar",
    templateUrl: "sidebar.component.html"
})
export class SidebarComponent {
    users: any[];


    constructor(
        private store: Store<IAppState>
    ) {
        this.store.select(selectContactList).subscribe({
            next: data => this.users = data
        })
    }
}