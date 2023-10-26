import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { UIActions } from 'src/app/store/ui/actions';
import { UIState } from 'src/app/store/ui/reducer';

@Component({
    selector: 'app-user-info',
    templateUrl: './user-info.component.html',
    styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent {
    constructor(private store: Store<UIState>){}
    hideUserInfo(){ 
        this.store.dispatch(UIActions.toggleUserInfo());
    }
}
