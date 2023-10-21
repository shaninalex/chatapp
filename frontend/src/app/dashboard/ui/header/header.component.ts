import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ProfileState } from 'src/app/store/profile/profile.reducer';
import { selectProfile } from 'src/app/store/profile/profile.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

    constructor(
        private router: Router,
        private store: Store<ProfileState>
    ) {
        this.store.select(selectProfile).subscribe({
            next: user => {
                console.log(user);
            }
        });
    }
}
