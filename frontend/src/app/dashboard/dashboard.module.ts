import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './app-routing.module';
import { SidebarComponent } from './ui/sidebar/sidebar.component';
import { HeaderComponent } from './ui/header/header.component';

import { NgIconsModule } from '@ng-icons/core';
import {
    matMessageOutline,
    matSettingsOutline,
    matPowerSettingsNewOutline,
    matWechatOutline,
    matNotificationsOutline,
    matHomeOutline,
    matBookmarkBorderOutline,
} from '@ng-icons/material-icons/outline';


@NgModule({
    declarations: [
        DashboardComponent,
        SidebarComponent,
        HeaderComponent
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        NgIconsModule.withIcons({
            matMessageOutline,
            matSettingsOutline,
            matPowerSettingsNewOutline,
            matWechatOutline,
            matNotificationsOutline,
            matHomeOutline,
            matBookmarkBorderOutline,
        }),
    ]
})
export class DashboardModule { }
