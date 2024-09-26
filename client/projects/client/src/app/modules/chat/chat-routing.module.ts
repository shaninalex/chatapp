import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainChatComponent } from './main-chat.component';
import { SettingsComponent } from './containers/settings/settings.component';
import { ConversationComponent } from './containers/chat/conversation.component';
import { ContactsComponent } from './containers/contacts/contacts.component';

const routes: Routes = [
    {
        path: "",
        component: MainChatComponent,
        children: [
            {
                path: "",
                component: ConversationComponent
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
