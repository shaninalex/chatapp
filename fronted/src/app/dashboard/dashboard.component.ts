import { Component } from '@angular/core';
import { Subject, BehaviorSubject } from "rxjs";
import { WebsocketService } from './services/websocket.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent {

    messages: string[] = [];

    constructor(private socketService: WebsocketService) {
        this.socketService.messagesList.subscribe({
            next: (data: any) => {
                this.messages.push(data);
            }
        })
    }

    send() {
        this.socketService.send("ping");
    }
}
