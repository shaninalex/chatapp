import { Component, OnInit } from "@angular/core";
import { version } from '../../../../../../../../../package.json';
import { AppState } from "../../../../../store/store";
import { Store } from "@ngrx/store";
// import { selectRooms } from "../../../../../store/chat/selectors";
import { Observable } from "rxjs";
import { DiscoItem } from "stanza/protocol";

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
    version: string;
    rooms$: Observable<DiscoItem[]>;

    constructor(private store: Store<AppState>) {}

    ngOnInit(): void {
        this.version = version
        // this.rooms$ = this.store.select(selectRooms)
    }
}