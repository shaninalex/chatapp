import { Component, Input, OnInit } from "@angular/core";
import { ReceivedMessage } from "stanza/protocol";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../../../store/store";
import { selectMessagesByRoom } from "../../../../../../store/chat/reducers/messages";

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
})
export class MessagesComponent implements OnInit {
    @Input() roomJid: string;
    messages: ReceivedMessage[] = [];
    
    constructor(private store: Store<AppState>) { }
    
    ngOnInit(): void {
        this.store.select(selectMessagesByRoom(this.roomJid)).subscribe({
            next: msg => {
                // rerender whole message list on every new message ?
                this.messages = msg;
            }
        })
    }
}
