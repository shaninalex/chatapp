import {Component} from '@angular/core';

@Component({
    selector: 'ch-auth-layout',
    template: `
        <div class="h-screen flex items-center justify-center">
            <div>
                <ng-content></ng-content>
            </div>
        </div>
    `
})
export class AuthComponent {

}
