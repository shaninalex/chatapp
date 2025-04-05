import {Component} from '@angular/core';
import {AuthComponent} from '../../app/layouts/auth/auth.component';

@Component({
    selector: "ch-page-login",
    template: `
        <ch-auth-layout>
            Login page
        </ch-auth-layout>
    `,
    imports: [
        AuthComponent
    ]
})
export class PageLoginComponent {

}
