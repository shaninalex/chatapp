/*
* This service responsible for:
* - managing page title tag content
* - switching light/dark themes
* - toggle sidebar ( toggle sidebar labels )
* */
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {SidebarState} from './interfaces';


@Injectable({
    providedIn: 'root'
})
export class UiService implements SidebarState {
    private sidebarOpenSubject = new Subject<boolean>();
    sidebarOpen$ = this.sidebarOpenSubject.asObservable(); // Expose as observable
    private _sidebarOpen = true; //initial state of the sidebar.

    constructor() {}

    get sidebarOpen(): boolean {
        return this._sidebarOpen;
    }

    toggleSidebar() {
        this._sidebarOpen = !this._sidebarOpen;
        this.sidebarOpenSubject.next(this._sidebarOpen); // Notify subscribers
    }
}
