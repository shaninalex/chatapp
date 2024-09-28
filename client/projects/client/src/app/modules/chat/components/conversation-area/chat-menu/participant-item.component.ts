import { Component, Input } from "@angular/core";
import { RoomParticipant } from "@lib";


@Component({
    selector: "chat-participant-item",
    template: `
<div class="flex items-center justify-between gap-2">
    <div class="flex gap-2 p-2" (click)="handleClick()">
        <ui-avatar [image]="item.image" [size]="6" />
        @if (item.name) {
            {{ item.name }}
        } @else {
            {{ nameFromJid }}
        }
    </div>
    <button class="collocutor-menu bg-slate-100 rounded-lg px-2">
        <i class="fa-solid fa-ellipsis"></i>
    </button>
</div>
`,
    styles: [`
        :host:hover .collocutor-menu {
            opacity: 1
        }
        .collocutor-menu {
            opacity: 0
        }
    `]
})
export class ParticipantItemComponent {
    @Input() item: RoomParticipant

    handleClick() {

    }

    get nameFromJid(): string {
        return this.item.jid.split("/")[1]
    }
}
