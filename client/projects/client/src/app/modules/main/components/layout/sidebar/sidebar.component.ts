import { Component, OnInit } from "@angular/core";
import { version } from '../../../../../../../../../package.json';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
    version: string

    ngOnInit(): void {
        this.version = version
    }
}