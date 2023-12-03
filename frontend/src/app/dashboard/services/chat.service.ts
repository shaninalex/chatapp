import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class WebsocketService {
    socket: WebSocket | null;

    constructor() {}
    
    connect() {
        this.socket = new WebSocket(environment.WEBSOCKET_ADDRESS);
        this.socket.onopen = (event: Event) => {
            console.log(event);
        }
    
        this.socket.onmessage = (event: any) => {
            console.log(event);
        }
    }

    public send(message: string) {
        this.socket?.send(message);
    }

}