import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { HeaderComponent } from './components/header/header.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { ConversationComponent } from './components/conversation/conversation.component';
import { ContactItemComponent } from './components/contacts/contact-item/contact-item.component';
import { CheckboxComponent } from './ui/checkbox/checkbox.component';
import { CollapseComponent } from './ui/collapse/collapse.component';
import { FileListComponent } from './ui/file-list/file-list.component';
import { ImageTilesComponent } from './ui/image-tiles/image-tiles.component';
import { EditorComponent } from './components/conversation/editor/editor.component';
import { MessagesComponent } from './components/conversation/messages/messages.component';
import { MessageComponent } from './components/conversation/message/message.component';
import { StoreModule } from '@ngrx/store';
import { uiReducer } from './store/ui/reducer';

@NgModule({
    declarations: [
        AppComponent,
        SidebarComponent,
        ContactsComponent,
        HeaderComponent,
        UserInfoComponent,
        ConversationComponent,
        ContactItemComponent,
        CheckboxComponent,
        CollapseComponent,
        FileListComponent,
        ImageTilesComponent,
        EditorComponent,
        MessagesComponent,
        MessageComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        StoreModule.forRoot({
            ui: uiReducer
        }),
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
