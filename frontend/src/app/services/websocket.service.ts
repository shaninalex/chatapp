import { Injectable } from "@angular/core";
import { parseString } from "xml2js";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class WebsocketService {
    socket = new WebSocket(environment.WEBSOCKET_ADDRESS);

    constructor() {
        this.socket.onopen = (event: Event) => {
            console.log(event);
        }

        this.socket.onmessage = (event: any) => {
            parseString(event.data, (err, result) => {
                console.log(result);
            });
        }
    }

    public send(message: string) {
        this.socket.send(message);
    }

}