import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { SidebarComponent } from './ui/sidebar/sidebar.component';
import { HeaderComponent } from './ui/header/header.component';
import { XmppService } from './services/xmpp.service';

const DASHBOARD_ROUTES: Routes = [{
    path: "",
    component: DashboardComponent,
    children: [

    ]
}]

@NgModule({
    declarations: [
        DashboardComponent,
        SidebarComponent,
        HeaderComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(DASHBOARD_ROUTES)
    ],
    providers: [
        XmppService
    ]
})
export class DashboardModule { }
