// sidebar-state.interface.ts
import { Observable } from 'rxjs';
import {InjectionToken} from '@angular/core';

export interface SidebarState {
    sidebarOpen$: Observable<boolean>;
    toggleSidebar(): void;
}

export const SIDEBAR_STATE = new InjectionToken<SidebarState>('Sidebar State');
