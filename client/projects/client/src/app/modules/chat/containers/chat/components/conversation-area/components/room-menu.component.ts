import { Component, Input } from "@angular/core";
import { Conv } from "@lib";
import { Observable } from "rxjs";

/**
 * @description
 * If room:
 * - show for list of users
 * - owner menu ( ban, kick etc...)
 * - list of uploads
 * 
 * if one-to-one conversation:
 * - search in history,
 * - interlocutor info,
 * 
 * @export
 * @class RoomMenuComponent
 */
@Component({
    selector: "app-room-menu",
    template: `
    <div class="border-l h-full p-4 w-72">
        room menu
    </div>
    `
})
export class RoomMenuComponent {
    @Input() conversation$: Observable<Conv>
}