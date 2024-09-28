import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Room } from "@lib";
import { RoomType } from "@lib";


@Component({
    selector: "chat-room-item",
    template: `
        <div class="flex gap-2 p-2 rounded-lg hover:bg-slate-100 cursor-pointer shrink-0"
             [ngClass]="{'bg-slate-100': conv.selected }"
            (click)="selectConversation(conv.jid)"
        >
            @if (isPubSub) {
                <div class="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
                    <i class="fa-regular fa-envelope text-slate-500"></i>
                </div>
            } @else {
                @if (conv.image) {
                    <img class="w-8 h-8 rounded-full shrink-0" src="{{ conv.image }}"/>
                } @else {
                    <div class="w-8 h-8 bg-slate-300 rounded-full flex items-center justify-center">
                        <i class="fa-regular fa-user text-slate-500"></i>
                    </div>
                }
            }
            <div class="flex-grow">
                <div class="flex justify-between items-center mb-1 pt-1">
                    <div>
                        {{ name }}
                        @if (isRoom) {
                            <i class="fa-solid fa-user-group text-slate-500"></i>
                        }
                    </div>
                    <div class="text-sm text-slate-500">{{ conv.time | date: 'H:mm' }}</div>
                </div>
                @if (conv.preview) {
                    <div class="flex justify-between items-center text-sm">
                        <div class="text-slate-500">{{ conv.preview | slice: 0:30 }}...</div>
                        @if (conv.unread > 0) {
                            <div class="rounded-xl bg-violet-300 px-2">{{ conv.unread }}</div>
                        }
                    </div>
                }
            </div>
        </div>
    `
})
export class ChatRoomItemComponent {
    @Input() conv: Room;
    @Output() onClick: EventEmitter<string> = new EventEmitter();

    selectConversation(id: string) {
        this.onClick.emit(id);
    }

    get name(): string {
        return this.conv.name;
    }

    get isRoom(): boolean {
        return this.conv.type === RoomType.group
    }

    get isPubSub(): boolean {
        return this.conv.type === RoomType.pubsub
    }
}

