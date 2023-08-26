import { Component, OnInit } from '@angular/core';
import { WebsocketService } from './services/websocket.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
    // socket = new WebSocket("ws://127.0.0.1:5000/ws");

    constructor(private socketService: WebsocketService) {
        // this.socket.addEventListener("open", () => {
        //     this.socket.send(JSON.stringify({
        //         type: "hello from client",
        //         content: [3, "4", "this is test"]
        //     }));
        // });
    }

    // ngOnInit(): void {
    //     this.websocketService.connect();
    //     // this.websocketService.sendMessage("ping");
    // }

    send() {
        this.socketService.send("ping");
    }
}
