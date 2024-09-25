import {Component, Input, OnInit} from "@angular/core";
import {ChatState} from "stanza/Constants";
import {Observable} from "rxjs";
import {ReceivedMessage} from "stanza/protocol";

@Component({
    selector: 'app-chat-state',
    template: `
        @if (showStates(); as states) {
            <div class="text-slate-600 py-4 italic text-sm">
                {{ states }}
            </div>
        }
    `
})
export class ChatStateComponent implements OnInit {
    @Input() messages$: Observable<ReceivedMessage>;
    state: { [key: string]: ChatState } = {};

    ngOnInit(): void {
        this.messages$.subscribe({
            next: msg => {
                if (msg.chatState) this.state[msg.from] = msg.chatState
            }
        })
    }

    showStates(): string | null {
        const composingUsers = Object.keys(this.state).filter(k => this.state[k] === 'composing')
        return composingUsers.length ? `${composingUsers.join(', ')} composing...` : null
    }
}
