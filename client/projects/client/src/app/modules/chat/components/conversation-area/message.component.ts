import { Component, Input } from "@angular/core";
import { UiChatMessage } from "@lib";

@Component({
    selector: 'app-message',
    template: `
        <div class="flex flex-start gap-4 p-4 hover:bg-slate-50 rounded-lg" id="{{ m.id }}">
            <button>
                <ui-avatar [image]="image" [size]="10" />
            </button>
            <div class="flex-grow">
                <div class="flex flex-start justify-between">
                    <button class="text-sm text-slate-400">
                        {{ m.from }}
                    </button>
                    <button>
                        <i class="fa-solid fa-ellipsis"></i>
                    </button>
                </div>
                <div class="flex flex-start justify-between">
                    <div>{{ m.body }}</div>
                    <div class="text-xs text-slate-400">{{ m.time | date: 'shortTime' }}</div>
                </div>
            </div>
        </div>
    `
})
export class MessageComponent {
    @Input() m: UiChatMessage;

    /**
     * @description
     * This function returns user image from store by m.from
     * m.from should extract exact user nickname ( id ) since message can be sent like 1 to 1 chat or group chat
     * with chat full jid:
     * - nickname@host
     * - nickname@host/resource-name
     * - room@conversation.host/nickname
     * TODO: make utils function to extract nickname from all kinds of JID's
     */
    get image(): string {
        return `/assets/images/user-1.jpg`
    }
}
