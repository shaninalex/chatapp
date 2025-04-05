import {Component} from '@angular/core';
import {AuthLayoutComponent} from '@chat/app/layouts/auth/auth.component';
import {LoginComponent} from '@chat/features/auth';

@Component({
    selector: "ch-page-login",
    template: `
        <ch-auth-layout>
            <ch-auth-login/>
        </ch-auth-layout>
    `,
    imports: [
        AuthLayoutComponent,
        LoginComponent
    ]
})
export class PageLoginComponent {
}
