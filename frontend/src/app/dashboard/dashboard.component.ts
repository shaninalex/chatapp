import { Component } from '@angular/core';
import { WebsocketService } from './services/websocket.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
    constructor(private ws: WebsocketService) {
        
    }
}
