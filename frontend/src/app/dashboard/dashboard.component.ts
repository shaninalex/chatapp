import { Component, ViewEncapsulation } from '@angular/core';
import { Traits } from '../typedefs/identity';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/identity/reducer';
import { selectTraits } from '../store/identity/selectors';
import { XmppService } from './services/xmpp.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    encapsulation: ViewEncapsulation.None
})
export class DashboardComponent {
    identity$: Observable<Traits>;

    constructor(
        private store: Store<AppState>,
        private xmpp: XmppService,
    ) {
        this.identity$ = this.store.select(selectTraits);
        // TODO: receive access token from the backend ( new profile service? )
        this.connectToXMPP("24772281-f0a4-4343-8c9c-98c11a6af4ad@localhost", "hip1EqBLGYR3QOlIXgPfZwK7DW8IF9Pz");
    }

    connectToXMPP(jid: string, password: string) {
        this.xmpp.connect(jid, password);
    }

    disconnectFromXMPP() {
        this.xmpp.disconnect();
    }
}
