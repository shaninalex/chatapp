import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ProfileService } from './base_services/profile.service';
import { ProfileState } from './store/profile/profile.reducer';
import { Store } from '@ngrx/store';
import { ProfileActions } from './store/profile/profile.action-types';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {
    profile: Observable<any>;

    constructor(private store: Store<ProfileState>) {
        this.store.dispatch(ProfileActions.getProfileStart());
    }
}
