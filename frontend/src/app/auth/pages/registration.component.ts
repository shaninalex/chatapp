import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-registration',
    template: `
        <app-generated-form [form$]="form$"></app-generated-form>
        <div class="d-flex align-items-center justify-content-between">
            <a routerLink="/auth/login">Login</a>
            <a routerLink="/auth/recovery">Forgot password</a>
        </div>
    `
})
export class RegistrationComponent {
    form$: Observable<any>;

    constructor(private auth: AuthService, private route: ActivatedRoute) {
        this.route.queryParams.subscribe(data => this.form$ = this.auth.getRegistrationFlow(data["flow"]));
    }

}
