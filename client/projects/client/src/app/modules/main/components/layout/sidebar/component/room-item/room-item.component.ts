import { Component, Input } from "@angular/core";
import { Room } from "../../../../../../../store/chat/def";


@Component({
    selector: 'app-room-item',
    templateUrl: './room-item.component.html'
})
export class RoomItemComponent {
    @Input() room: Room;
}
