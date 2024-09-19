import { Component, OnInit } from "@angular/core";
import { version } from '../../../../../../../../../package.json';
import { from, map, mergeMap, Observable, of } from "rxjs";
import { DiscoItem, DiscoItems } from "stanza/protocol";
import { XmppService } from "../../../../../lib/services/xmpp.service";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../../store/store";
import { ChatRoomAdd } from "../../../../../store/chat/actions";

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
    version: string;
    rooms$: Observable<DiscoItem[]> = of([]);

    constructor(private xmpp: XmppService, private store: Store<AppState>) { }
    ngOnInit(): void {
        this.version = version
        this.rooms$ = this.loadRoomsAndDispatch();
    }

    private loadRoomsAndDispatch(): Observable<DiscoItem[]> {
        return this.xmpp.queryRoomsOnline().pipe(
            map((data) => (data.disco as DiscoItems).items || []),
            mergeMap((rooms: DiscoItem[]) => from(rooms)),
            mergeMap((room: DiscoItem) =>
                this.xmpp.getRoomInfo(room.jid as string).pipe(
                    map((info) => ({ room, info }))
                )
            ),
            map(({ room, info }) => {
                this.dispatchRoomInfo(room.jid as string, info);
                return room;
            }),
            map((room) => [room])
        );
    }

    private dispatchRoomInfo(jid: string, info: any): void {
        this.store.dispatch(ChatRoomAdd({
            payload: { id: jid, info }
        }));
    }
}
