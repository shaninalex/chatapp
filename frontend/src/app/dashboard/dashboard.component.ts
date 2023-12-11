import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Traits } from '../store/typedefs';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { IAppState } from '../store/store';
import { selectTraits } from '../store/selectors';
import { XmppService } from './services/xmpp.service';
import { ProfileService } from './services/profile.service';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnDestroy {
    identity$: Observable<Traits | undefined>;

    constructor(
        private store: Store<IAppState>,
        private xmpp: XmppService,
        private profile: ProfileService,
    ) {
        this.identity$ = this.store.select(selectTraits);
        this.profile.getCredentials().subscribe({
            next: data => this.xmpp.connect(data.jid, data.token)
        });
    }

    ngOnDestroy(): void {
        this.xmpp.disconnect();
    }
}
