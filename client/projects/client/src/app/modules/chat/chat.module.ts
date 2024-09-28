import { CommonModule } from "@angular/common";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UiModule } from "@ui";
import { XmppEventsDistributionService } from "../../lib/services/xmpp-events-distribution.service";
import { MainChatComponent } from "./main-chat.component";
import { ChatRoutingModule } from "./chat-routing.module";
import { SettingsComponent } from "./containers/settings/settings.component";
import { TabFormComponent } from "./components/tab-form.component";
import { ConversationComponent } from "./containers/chat/conversation.component";
import { ConversationsListComponent } from "./components/conversations-list/conversations-list.component";
import { ContactsComponent } from "./containers/contacts/contacts.component";
import { HeaderComponent } from "../../layout/header/header.component";
import { SidebarComponent } from '../../layout/sidebar/sidebar.component';
import { ChatRoomItemComponent } from "./components/chat-room-item.component";
import { ConversationAreaComponent } from "./components/conversation-area/conversation-area.component";
import { ChatMenuComponent } from "./components/conversation-area/chat-menu/chat-menu.component";
import { ChatStateComponent } from "./components/chat-states.component";
import { ParticipantItemComponent } from "./components/conversation-area/chat-menu/participant-item.component";
import { MessageComponent } from "./components/conversation-area/message.component";
import { SendFromComponent } from "./components/conversation-area/send-form.component";
import { NoChatSelectedComponent } from "./components/not-chat-selected.component";
import { LibPipesModule } from "@lib";
import { PrivateRoomItem } from "./components/conversation-area/chat-menu/private-room-item.component";

@NgModule({
    declarations: [
        MainChatComponent,
        SettingsComponent,
        ConversationComponent,
        ContactsComponent,
        HeaderComponent,
        SidebarComponent,

        // ui
        TabFormComponent,
        ConversationsListComponent,
        ChatRoomItemComponent,
        ConversationAreaComponent,
        ChatMenuComponent,
        ChatStateComponent,
        ParticipantItemComponent,
        MessageComponent,
        SendFromComponent,
        NoChatSelectedComponent,
        PrivateRoomItem,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ChatRoutingModule,
        UiModule,

        LibPipesModule,
    ],
    providers: [
        provideHttpClient(withInterceptorsFromDi()),
        XmppEventsDistributionService,
    ]
})
export class ChatModule {
}
