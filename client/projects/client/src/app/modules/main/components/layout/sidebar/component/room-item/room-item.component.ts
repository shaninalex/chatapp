import { Component, Input } from "@angular/core";
import { Room } from "../../../../../../../store/chat/def";
import { DiscoItem } from "stanza/protocol";


@Component({
    selector: 'app-room-item',
    templateUrl: './room-item.component.html'
})
export class RoomItemComponent {
    @Input() room: DiscoItem;
}
