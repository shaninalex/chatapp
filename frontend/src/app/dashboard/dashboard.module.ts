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
import { AppState } from './store';
import { EffectsModule } from '@ngrx/effects';
import { IdentityEffects } from './store/identity/effects';
import { ChatEffects } from './store/chat/chat.effects';


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
        StoreModule.forFeature("dashboard", AppState),
        EffectsModule.forFeature(IdentityEffects, ChatEffects)
    ],
    providers: [
        XmppService,
        ProfileService
    ]
})
export class DashboardModule { }
