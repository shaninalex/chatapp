import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    profile: Observable<any>;

    constructor() {
        // this.store.dispatch(ProfileActions.getProfileStart());
    }
}
