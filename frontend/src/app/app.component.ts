import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ProfileService } from './base_services/profile.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {
    profile: Observable<any>;

    constructor(private profileService: ProfileService) {
        this.profile = this.profileService.getProfile();
        this.profile.subscribe({
            next: data => {
                console.log(data);
            }
        })
    }
}
