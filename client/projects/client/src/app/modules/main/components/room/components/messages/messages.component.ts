import { Component, Input, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { ReceivedMessage } from "stanza/protocol";

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html'
})
export class MessagesComponent implements OnInit {
    @Input() messages$: Observable<ReceivedMessage>;
    messages: ReceivedMessage[] = [];

    printable(msg: ReceivedMessage): boolean {
        return msg.body ? true : false;
    }

    ngOnInit(): void {
        this.messages$.subscribe({
            next: msg => this.messages.push(msg)
        })
    }
}
