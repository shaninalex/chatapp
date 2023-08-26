import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {

    constructor(
        private router: Router,
        private tokenService: TokenService
    ) { }

    logout(): void {
        this.tokenService.removeAccessToken();
        this.router.navigate(['/auth']);
    }
}
