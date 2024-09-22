import { CommonModule } from "@angular/common";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MainComponent } from "./main.component";
import { MainRoutingModule } from "./main-routing.module";
import { HeaderComponent } from "./components/layout/header/header.component";
import { SidebarComponent } from "./components/layout/sidebar/sidebar.component";
import { UiModule } from "@ui";
import { SettingsComponent } from "./components/settings/settings.component";
import { TabFormComponent } from "./components/settings/components/tab-form/tab-form.component";
import { RoomComponent } from "./components/room/room.component";
import { MessagesComponent } from "./components/room/components/messages/messages.component";
import { MessageComponent } from "./components/room/components/message/message.component";
import { ChatStateComponent } from "./components/room/components/chat-states/chat-states.component";
import { RoomItemComponent } from "./components/layout/sidebar/component/room-item/room-item.component";
import { SenderComponent } from "./components/room/components/sender/sender.component";
import { ParticipantsComponent } from "./components/room/components/participants/participants.component";
import { XmppEventsDistributionService } from "../../lib/services/xmpp-events-distribution.service";
import { SubscriptionItemComponent } from "./components/layout/sidebar/component/subscription-item/subscription-item.component";


@NgModule({
    declarations: [
        // pages
        MainComponent,
        SettingsComponent,
        RoomComponent,

        // layout
        HeaderComponent,
        SidebarComponent,
        TabFormComponent,
        MessagesComponent,
        MessageComponent,
        ChatStateComponent,
        RoomItemComponent,
        SenderComponent,
        ParticipantsComponent,
        SubscriptionItemComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MainRoutingModule,
        UiModule,
    ],
    providers: [
        provideHttpClient(withInterceptorsFromDi()),
        XmppEventsDistributionService,
    ]
})
export class MainModule { }
