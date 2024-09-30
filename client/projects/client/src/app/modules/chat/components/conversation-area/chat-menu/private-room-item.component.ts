import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Room } from "@lib";


@Component({
    selector: "chat-private-room-item",
    template: `
<div class="flex items-center justify-between gap-2">
    <div class="flex items-center gap-2 p-2 cursor-pointer" (click)="handleClick()">
        <ui-avatar [image]="item.image" [size]="8" />

        {{ item.jid | subroomname }}
    </div>
    <button class="collocutor-menu bg-slate-100 rounded-lg px-2">
        <i class="fa-solid fa-ellipsis"></i>
    </button>
</div>
`
})
export class PrivateRoomItem {
    @Input() item: Room;

    constructor(private router: Router) { }

    handleClick() {
        this.router.navigate(["chat", this.item.jid]);
    }
}
