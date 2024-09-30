import { Component, Input } from "@angular/core";
import { Room } from "@lib";
import { RoomType } from "@lib";
import { Store } from "@ngrx/store";
import { AppState } from "@store/store";
import { Router } from "@angular/router";
import { ChatRoomsSelect } from "@store/chat/actions";


@Component({
    selector: "chat-room-item",
    template: `
        <div class="flex gap-2 p-2 rounded-lg hover:bg-slate-100 cursor-pointer shrink-0"
             [ngClass]="{'bg-slate-100': conv.selected }"
            (click)="selectConversation()"
        >
            @if (isPubSub) {
                <div class="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
                    <i class="fa-regular fa-envelope text-slate-500"></i>
                </div>
            } @else {
                <ui-avatar [image]="conv.image" [size]="8" />
            }
            <div class="flex-grow">
                <div class="flex justify-between items-center mb-1 pt-1">
                    <div>
                        {{ conv.name }}
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

    constructor(private store: Store<AppState>, private router: Router) { }

    selectConversation() {
        this.router.navigate([this.conv.type, this.conv.jid]);
        this.store.dispatch(ChatRoomsSelect({
            payload: {
                id: this.conv.jid,
                changes: {
                    selected: true
                }
            }
        }))
    }

    get isRoom(): boolean {
        return this.conv.type === RoomType.group
    }

    get isPubSub(): boolean {
        return this.conv.type === RoomType.pubsub
    }
}


