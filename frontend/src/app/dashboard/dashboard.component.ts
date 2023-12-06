import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Traits } from '../typedefs/identity';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/identity/reducer';
import { selectTraits } from '../store/identity/selectors';
import { XmppService } from './services/xmpp.service';
import { ProfileService } from './services/profile.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnDestroy {
    identity$: Observable<Traits>;

    constructor(
        private store: Store<AppState>,
        private xmpp: XmppService,
        private profile: ProfileService
    ) {
        this.identity$ = this.store.select(selectTraits);
        this.profile.getCredentials().subscribe({
            next: data => {
                this.xmpp.connect(data.jid, "d650f8bc-41ff-49d4-b3f5-108055ccc25b");
            }
        });
    }

    ngOnDestroy(): void {
        this.xmpp.disconnect();
    }
}
