import { Component, OnInit } from "@angular/core";
import { version } from '../../../../../../../../../package.json';
import { Observable, of } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../../store/store";
import { selectRoomsAll } from "../../../../../store/chat/reducers/rooms";
import { DiscoItem, ReceivedPresence } from "stanza/protocol";
import { Conversation } from "../../../../../store/chat/def";
import { selectConversationAll } from "../../../../../store/chat/reducers/conversation";
import { selectSubscriptionsAll } from "../../../../../store/chat/reducers/subscriptions";

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
    version: string;
    rooms$: Observable<DiscoItem[]> = of([])
    conversations$: Observable<Conversation[]> = of([])
    subscriptions$: Observable<ReceivedPresence[]> = of([])
    tab: "conversation" | "contacts" = "conversation"

    constructor(private store: Store<AppState>) { }
    ngOnInit(): void {
        this.version = version;
        this.rooms$ = this.store.select(selectRoomsAll);
        this.conversations$ = this.store.select(selectConversationAll);
        this.subscriptions$ = this.store.select(selectSubscriptionsAll);
    }

    changeTab(tabName: "conversation" | "contacts") {
        this.tab = tabName
    }
}
