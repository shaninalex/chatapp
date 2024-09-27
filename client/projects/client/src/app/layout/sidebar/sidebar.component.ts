import { Component } from "@angular/core";
import { version } from '../../../../../../package.json';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
    version: string = version;
}
