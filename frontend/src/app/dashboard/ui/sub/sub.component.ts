import { Component } from '@angular/core';
import { IDashboardState } from '../../store/store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Sub } from '../../store/sub.reducers';
import { selectSubsList } from '../../store/sub.selectors';
import { SubsActions } from '../../store/actions';

@Component({
  selector: 'app-sub',
  templateUrl: './sub.component.html'
})
export class SubComponent {

  subs: Observable<Sub[]>;

  constructor(private store: Store<IDashboardState>) {
    this.subs = this.store.select(selectSubsList);
  }

  approve(id: string): void {
    this.store.dispatch(SubsActions.approve_sub({ from: id }));
  }
}
