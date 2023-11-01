import { Component } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectUserInfoVisibility } from './store/ui/selectors';
import { AppState } from './store';
import { ProfileActions } from './store/profile/actions';
import { WebsocketService } from './services/websocket.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    showUserInfo: Observable<boolean>;

    constructor(
        private store: Store<AppState>,
        private ws: WebsocketService,
    ) {
        this.showUserInfo = this.store.select(selectUserInfoVisibility);
        this.store.dispatch(ProfileActions.getUserStart());
    }
}
