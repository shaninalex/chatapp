import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Room } from "@lib";


@Component({
    selector: "chat-private-room-item",
    template: `
<div class="flex items-center justify-between gap-2">
    <div class="flex gap-2 p-2 cursor-pointer" (click)="handleClick()">
        @if (item.image) {
            <img class="w-6 h-6 rounded-full shrink-0" src="{{ item.image }}" />
        } @else {
            <div class="w-6 h-6 bg-slate-300 rounded-full flex items-center justify-center">
                <i class="fa fa-user text-slate-500"></i>
            </div>
        }

        {{ item.jid | subroomname }}
        <!-- @if (item.name) {
            {{ item.name }}
        } @else {
            {{ item.jid | subroomname }}
        } -->
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
