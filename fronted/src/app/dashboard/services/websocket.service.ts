import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class WebsocketService {
    private socket: WebSocket;
    messages: string[] = [];

    constructor() {
        this.socket = new WebSocket('ws://localhost:5000/ws');

        this.socket.onmessage = (event) => {
            this.messages.push(event.data);
        };
    }

    sendMessage(message: string) {
        console.log("send message");
        this.socket.send(message);
    }
}