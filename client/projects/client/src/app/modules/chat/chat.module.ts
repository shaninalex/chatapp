import {CommonModule} from "@angular/common";
import {provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {NgModule} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {UiModule} from "@ui";
import {XmppEventsDistributionService} from "../../lib/services/xmpp-events-distribution.service";
import {MainChatComponent} from "./main-chat.component";
import {ChatRoutingModule} from "./chat-routing.module";
import {SettingsComponent} from "./containers/settings/settings.component";
import {TabFormComponent} from "./components/tab-form.component";
import {ConversationComponent} from "./containers/chat/conversation.component";
import {ConversationsListComponent} from "./components/conversations-list/conversations-list.component";
import {ContactsComponent} from "./containers/contacts/contacts.component";
import {HeaderComponent} from "../../layout/header/header.component";
import {SidebarComponent} from '../../layout/sidebar/sidebar.component';
import {ConvItemComponent} from "./components/conv-item.component";
import {ConversationAreaComponent} from "./components/conversation-area/conversation-area.component";
import {ChatMenuComponent} from "./components/chat-menu.component";
import {ChatStateComponent} from "./components/chat-states.component";
import {
    CollocutorItemComponent
} from "./components/collocutor-item.component";
import {MessageComponent} from "./components/message.component";

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
        MessageComponent,
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
