import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { selectContactList } from "../../../store/chat/chat.selectors";
import { IAppState } from "../../../store";
import { XmppService } from "../../services/xmpp.service";

@Component({
    selector: "div#app-sidebar",
    templateUrl: "sidebar.component.html"
})
export class SidebarComponent {
    users: any[];

    constructor(
        private xmpp: XmppService,
        private store: Store<IAppState>
    ) {
        this.store.select(selectContactList).subscribe({
            next: data => this.users = data
        })
    }

    getVCard(jid: string) {
        this.xmpp.getVCard(jid).then(data => {
            console.log(data);
        });
    }
}