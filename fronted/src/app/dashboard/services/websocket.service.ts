import { Injectable } from "@angular/core";


@Injectable()
export class WebsocketService {
    socket = new WebSocket("ws://localhost:5000/ws");

    constructor() {

        this.socket.onopen = (event: Event) => {
            console.log(event);
        }

        this.socket.onmessage = (event: Event) => {
            console.log(event);
        }
    }

    public send(message: string) {
        this.socket.send(message);
    }
}