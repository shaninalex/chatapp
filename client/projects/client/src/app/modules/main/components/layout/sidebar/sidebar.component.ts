import { Component, OnInit } from "@angular/core";
import { version } from '../../../../../../../../../package.json';
import { Observable, of } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../../store/store";
import { selectRoomsAll } from "../../../../../store/chat/reducers/rooms";
import { Room } from "../../../../../store/chat/def";

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
    version: string;
    rooms$: Observable<Room[]> = of([])

    constructor(private store: Store<AppState>) { }

    ngOnInit(): void {
        this.version = version;
        this.rooms$ = this.store.select(selectRoomsAll);
    }
}
