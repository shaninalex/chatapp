import {CommonModule} from "@angular/common";
import {provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {NgModule} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {UiModule} from "@ui";
import {XmppEventsDistributionService} from "../../lib/services/xmpp-events-distribution.service";
import {MainChatComponent} from "./main-chat.component";
import {ChatRoutingModule} from "./chat-routing.module";
import {SettingsComponent} from "./containers/settings/settings.component";
import {TabFormComponent} from "./containers/settings/components/tab-form/tab-form.component";
import {ConversationComponent} from "./containers/chat/conversation.component";
import {ConversationsListComponent} from "./containers/chat/components/conversations-list/conversations-list.component";
import {ContactsComponent} from "./containers/contacts/contacts.component";
import {HeaderComponent} from "../../layout/header/header.component";
import {SidebarComponent} from '../../layout/sidebar/sidebar.component';
import {ConvItemComponent} from "./containers/chat/components/conversations-list/components/conv-item.component";
import {ConversationAreaComponent} from "./containers/chat/components/conversation-area/conversation-area.component";
import {ChatMenuComponent} from "./containers/chat/components/conversation-area/components/chat-menu.component";
import {ChatStateComponent} from "./containers/chat/components/conversation-area/components/chat-states.component";
import {
    CollocutorItemComponent
} from "./containers/chat/components/conversation-area/components/collocutor-item.component";

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
        ConvItemComponent,
        ConversationAreaComponent,
        ChatMenuComponent,
        ChatStateComponent,
        CollocutorItemComponent,
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
export class ChatModule {
}
