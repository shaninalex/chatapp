import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './app-routing.module';
import { SidebarComponent } from './ui/sidebar/sidebar.component';
import { HeaderComponent } from './ui/header/header.component';
import { HttpClientModule } from "@angular/common/http";

import { NgIconsModule } from '@ng-icons/core';
import {
    matMessageOutline,
    matSettingsOutline,
    matPowerSettingsNewOutline,
    matWechatOutline,
    matNotificationsOutline,
    matHomeOutline,
    matBookmarkBorderOutline,
    matSearchOutline,
    matMoreVertOutline,
} from '@ng-icons/material-icons/outline';
import { ChatComponent } from './pages/chat/chat.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { ContactItemComponent } from './ui/contact-item/contact-item.component';
import { WebsocketService } from './services/websocket.service';


@NgModule({
    declarations: [
        DashboardComponent,
        SidebarComponent,
        HeaderComponent,
        ChatComponent,
        SettingsComponent,
        ContactItemComponent
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        HttpClientModule,
        NgIconsModule.withIcons({
            matMessageOutline,
            matSettingsOutline,
            matPowerSettingsNewOutline,
            matWechatOutline,
            matNotificationsOutline,
            matHomeOutline,
            matBookmarkBorderOutline,
            matSearchOutline,
            matMoreVertOutline,
        }),
    ],
    providers: [
        WebsocketService
    ]
})
export class DashboardModule { }
