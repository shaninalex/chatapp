import { Component } from '@angular/core';
import { Observable, filter, identity, map } from 'rxjs';
import { ProfileService } from '../../services/profile.service';
import { Store } from '@ngrx/store';
import { selectIdentityFeature } from '../../../store/identity/selectors';
import { IAppState } from '../../../store';


@Component({
  selector: '#app-people-list',
  templateUrl: './people-list.component.html'
})
export class PeopleListComponent {
  profiles$: Observable<any>;

  constructor(
    private profile: ProfileService,
    private store: Store<IAppState>,
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
}
