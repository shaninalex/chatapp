import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {

    constructor(
        private authService: AuthService
    ) { }

    logout(): void {
        this.authService.logout();
    }
}
