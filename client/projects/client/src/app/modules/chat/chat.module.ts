import { CommonModule } from "@angular/common";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { UiModule } from "@ui";
import { XmppEventsDistributionService } from "../../lib/services/xmpp-events-distribution.service";
import { MainChatComponent } from "./main-chat.component";
import { ChatRoutingModule } from "./chat-routing.module";
import { SettingsComponent } from "./containers/settings/settings.component";
import { TabFormComponent } from "./containers/settings/components/tab-form/tab-form.component";
import { ConversationComponent } from "./containers/chat/conversation.component";
import { ConversationsListComponent } from "./containers/chat/components/conversations-list/conversations-list.component";
import { ContactsComponent } from "./containers/contacts/contacts.component";

@NgModule({
    declarations: [
        MainChatComponent,
        SettingsComponent,
        ConversationComponent,
        ContactsComponent,

        // ui
        TabFormComponent,
        ConversationsListComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ChatRoutingModule,
        UiModule,
    ],
    providers: [
        provideHttpClient(withInterceptorsFromDi()),
        XmppEventsDistributionService,
    ]
})
export class ChatModule {}