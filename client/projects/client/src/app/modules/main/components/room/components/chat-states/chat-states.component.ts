import { Component, Input, OnInit } from "@angular/core";
import { filter, Observable } from "rxjs";
import { ChatState } from "stanza/Constants";
import { ReceivedMessage } from "stanza/protocol";

@Component({
    selector: 'app-chat-state',
    templateUrl: './chat-states.component.html'
})
export class ChatStateComponent implements OnInit {
    @Input() messages$: Observable<ReceivedMessage>;

    state: { [key: string]: ChatState } = {};
    /*
        TO IMPLEMENT

        Logic behind chat states:
        Doc: https://xmpp.org/extensions/xep-0085.html

        Ngrx store all room participants with their states. ( or figure out
        how to do this without ngrx ) If state of some
        user has been changed to "composing" - display message like this:
        Alex is writing...
        If state has been change to something else, "active" or "paused", then
        remove message.

        If 2 or more user write the message - display:
        Alex, Bob are writing...

        To catch all this things we should get messages from Observable,
        not from simple list of messages. Then filter them to the messages
        with "chatState" key in object.

        P.S. - I think this is affiliations list
    */

    ngOnInit(): void {
        this.messages$.pipe(
            filter(msg => "chatState" in msg)
        ).subscribe({
            next: msg => {
                this.state[msg.from] = msg.chatState as ChatState
                console.log(this.state)
            }
        })
    }
}
