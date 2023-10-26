import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store';
import { UIActions } from 'src/app/store/ui/actions';
import { selectContactsCompactView } from 'src/app/store/ui/selectors';


@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.css']
})
export class ContactsComponent {
    compactView: Observable<boolean>;

    constructor(private store: Store<AppState>) {
        this.compactView = this.store.select(selectContactsCompactView);
    }

    toggleCompactView() {
        this.store.dispatch(UIActions.toggleContactsCompactView());
    }
}
