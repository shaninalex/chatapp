import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectUserInfoVisibility } from './store/ui/selectors';
import { AppState } from './store';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    showUserInfo: Observable<boolean>;

    constructor(private store: Store<AppState>) {
        this.showUserInfo = this.store.select(selectUserInfoVisibility);
    }
}
