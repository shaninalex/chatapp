import { Component, OnInit } from '@angular/core';
import { WebsocketService } from './services/websocket.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
    constructor(private websocketService: WebsocketService) {
    }
    
    ngOnInit(): void {
        this.websocketService.sendMessage("test");
    }
}
