import { Component, Input, OnInit } from "@angular/core";
import { ReceivedMessage } from "stanza/protocol";

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html'
})
export class MessageComponent implements OnInit {
    @Input() message: ReceivedMessage;

    ngOnInit() {
        // console.log(this.message);
    }
}
