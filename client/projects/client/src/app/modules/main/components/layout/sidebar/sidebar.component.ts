import { Component, OnInit } from "@angular/core";
import { version } from '../../../../../../../../../package.json';
import { map, Observable, of, switchMap } from "rxjs";
import { DiscoItem, DiscoItems } from "stanza/protocol";
import { XmppService } from "../../../../../lib/services/xmpp.service";
// import { XmppService } from "../../../services/xmpp.service";

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
    version: string;
    rooms$: Observable<DiscoItem[]> = of([]);

    constructor(private xmpp: XmppService) { }
    ngOnInit(): void {
        this.version = version
        this.rooms$ = this.xmpp.queryRoomsOnline().pipe(
            map((data) => (data.disco as DiscoItems).items || [])
        );
    }
}