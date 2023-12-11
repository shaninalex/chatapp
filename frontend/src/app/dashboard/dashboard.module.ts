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
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ChatEffects } from './store/chat/chat.effects';
import { dashboardReducer } from './store';
import { MessagesService } from '../shared/services/messages.service';


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
        HttpClientModule,
        RouterModule.forChild(DASHBOARD_ROUTES),
        StoreModule.forFeature("dashboard", dashboardReducer),
        EffectsModule.forFeature(ChatEffects)
    ],
    providers: [
        XmppService,
        ProfileService,
        MessagesService
    ]
})
export class DashboardModule { }
