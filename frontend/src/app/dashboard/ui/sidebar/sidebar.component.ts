import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { selectContactList } from "../../../store/chat/chat.selectors";
import { IAppState } from "../../../store";
import { XmppService } from "../../services/xmpp.service";
import { map } from "rxjs";

@Component({
    selector: "app-sidebar",
    templateUrl: "sidebar.component.html"
})
export class SidebarComponent {
    users: any[];


    constructor(
        private xmpp: XmppService,
        private store: Store<IAppState>
    ) {
        this.store.select(selectContactList).pipe(
            map(data => {
                if (data) {
                    for (let i = 0; i <= data.length; i++) {
                        let card = this.xmpp.getVCard(data.jid);
                    }
                }
                return data;
            })
        ).subscribe({
            next: data => this.users = data
        })
    }
}