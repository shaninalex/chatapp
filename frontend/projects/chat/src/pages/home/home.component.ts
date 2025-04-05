import {Component} from '@angular/core';
import {MainLayoutComponent} from '../../app/layouts/main/main.component';

@Component({
    selector: "ch-page-home",
    template: `
        <ch-main-layout>
            Home page
        </ch-main-layout>
    `,
    imports: [
        MainLayoutComponent
    ]
})
export class PageHomeComponent {

}
