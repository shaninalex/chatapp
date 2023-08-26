import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';

import { HeaderComponent } from './ui/header/header.component';
import { SidebarComponent } from './ui/sidebar/sidebar.component';
import { WebsocketService } from './services/websocket.service';


const routes: Routes = [
    {
        path: "",
        component: DashboardComponent
    }
]

@NgModule({
    declarations: [
        DashboardComponent,
        HeaderComponent,
        SidebarComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    providers: [WebsocketService]
})
export class DashboardModule { }
