import { Component } from '@angular/core';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    constructor(private router: Router, private tokenService: TokenService) {
        if (this.tokenService.ifExist()) {
            this.router.navigate(['/']);
        }
    }
}
