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
                console.log(data.jid, data.token);
                this.xmpp.connect(data.jid, "5ba0a5fe-2a13-48c1-8979-f64f55f92883");
            }
        });
    }

    // send() {
    //   this.xmpp.send();
    // }

    ngOnDestroy(): void {
        this.xmpp.disconnect();
    }
}
