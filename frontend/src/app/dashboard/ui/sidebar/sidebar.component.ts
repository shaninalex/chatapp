import { Component } from "@angular/core";
import { RosterItem } from "stanza/protocol";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { selectContactList } from "../../store/chat/chat.selectors";
import { IDashboardState } from "../../store";

@Component({
    selector: "div#app-sidebar",
    templateUrl: "sidebar.component.html"
})
export class SidebarComponent {
    users$: Observable<RosterItem[]>;

    constructor(private store: Store<IDashboardState>) {
        this.users$ = this.store.select(selectContactList);

        // this.xmpp.vcard$.pipe(filter(isNotNull)).subscribe(data => {
        //     console.log(data);
        // })
    }
}