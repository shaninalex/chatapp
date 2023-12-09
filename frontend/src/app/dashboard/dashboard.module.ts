import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { SidebarComponent } from './ui/sidebar/sidebar.component';
import { HeaderComponent } from './ui/header/header.component';
import { XmppService } from './services/xmpp.service';
import { ProfileService } from './services/profile.service';
import { PeopleListComponent } from './pages/people-list/people-list.component';
import { ConversationComponent } from './pages/conversation/conversation.component';


const DASHBOARD_ROUTES: Routes = [{
    path: "",
    component: DashboardComponent,
    children: [
        { path: "", component: ConversationComponent },
        { path: "people", component: PeopleListComponent }
    ]
}];


@NgModule({
    declarations: [
        DashboardComponent,
        SidebarComponent,
        HeaderComponent,
        PeopleListComponent,
        ConversationComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(DASHBOARD_ROUTES)
    ],
    providers: [
        XmppService,
        ProfileService
    ]
})
export class DashboardModule { }
