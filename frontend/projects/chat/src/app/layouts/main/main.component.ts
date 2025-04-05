import {Component} from '@angular/core';
import {HeaderComponent} from './components/header/header.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';

@Component({
    selector: 'ch-main-layout',
    imports: [
        HeaderComponent,
        SidebarComponent
    ],
    template: `
        <div class="h-screen flex">
            <ch-sidebar/>
            <div class="grow flex flex-col">
                <ch-header/>
                <div class="grow pr-6 pb-6">
                    <div class="bg-white rounded-2xl h-full overflow-y-auto shadow p-4 max-h-[calc(100vh_-_5.5rem)]">
                        <ng-content></ng-content>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class MainLayoutComponent {

}
