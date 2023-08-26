import { Injectable } from "@angular/core";
import { Subject } from "rxjs";


@Injectable()
export class WebsocketService {
    socket = new WebSocket("ws://localhost:5000/ws");
    public messagesList: Subject<string[]> = new Subject<string[]>();

    constructor() {

        this.socket.onopen = (event: Event) => {
            console.log(event);
        }

        this.socket.onmessage = (event: any) => {
            this.messagesList.next(event.data);
        }
    }

    public send(message: string) {
        this.socket.send(message);
    }
}
