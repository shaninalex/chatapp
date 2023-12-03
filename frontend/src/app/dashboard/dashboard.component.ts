import { Component, ViewEncapsulation } from '@angular/core';
import { Traits } from '../typedefs/identity';
import { Observable, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/identity/reducer';
import { selectTraits } from '../store/identity/selectors';
import { WebsocketService } from './services/chat.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    encapsulation: ViewEncapsulation.None
})
export class DashboardComponent {
    identity$: Observable<Traits>;

    constructor(
        private store: Store<AppState>,
        private socket: WebsocketService,
    ) {
        this.identity$ = this.store.select(selectTraits).pipe(
            tap(data => {
                if (data) {
                    console.log(data);
                    this.socket.connect();
                }
            })
        );
    }
}
