import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainChatComponent } from './main-chat.component';
import { SettingsComponent } from './containers/settings/settings.component';
import { ConversationComponent } from './containers/chat/conversation.component';
import { ContactsComponent } from './containers/contacts/contacts.component';
import { ConversationAreaComponent } from './components/conversation-area/conversation-area.component';
import { NoChatSelectedComponent } from './components/not-chat-selected.component';

const routes: Routes = [
    {
        path: "",
        component: MainChatComponent,
        children: [
            {
                path: "",
                component: ConversationComponent,
                children: [
                    {
                        path: "",
                        component: NoChatSelectedComponent,
                    },
                    {
                        path: ":type/:id",
                        component: ConversationAreaComponent,
                    }
                ]
            },
            {
                path: "settings",
                component: SettingsComponent
            },
            {
                path: "contacts",
                component: ContactsComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ChatRoutingModule { }
