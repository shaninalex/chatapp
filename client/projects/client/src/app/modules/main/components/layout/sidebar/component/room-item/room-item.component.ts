import { Component, Input } from "@angular/core";
import { DiscoItem } from "stanza/protocol";


@Component({
    selector: 'app-room-item',
    templateUrl: './room-item.component.html'
})
export class RoomItemComponent {
    @Input() room: DiscoItem;
}
