import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ProfileService } from '../../services/profile.service';
import { Store } from '@ngrx/store';
import { selectIdentityFeature } from '../../../store/selectors';
import { IAppState } from '../../../store/store';
import { XmppService } from '../../services/xmpp.service';


@Component({
  selector: '#app-people-list',
  templateUrl: './people-list.component.html'
})
export class PeopleListComponent {
  profiles$: Observable<any>;

  constructor(
    private profile: ProfileService,
    private store: Store<IAppState>,
    private xmpp: XmppService
  ) {
    this.store.select(selectIdentityFeature).subscribe({
      next: data => {
        const id = data.identity?.identity.id;
        this.profiles$ = this.profile.getListOfPeople().pipe(
          map(identities => {
            return identities.filter((i:any) => i.id !== id)
          })
        );
      }
    });
  }

  addFriend(id: string): void {
    console.log(id);
    this.xmpp.addFriend(id);
  }
}
