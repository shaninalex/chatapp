import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { UIActions } from 'src/app/store/ui/actions';
import { UIState } from 'src/app/store/ui/reducer';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {

    constructor(private store: Store<UIState>) {}
    toggleUserInfo() {
        this.store.dispatch(UIActions.toggleUserInfo());
    }
}
