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

@NgModule({
    declarations: [
        AppComponent,
        SidebarComponent,
        ContactsComponent,
        HeaderComponent,
        UserInfoComponent,
        ConversationComponent,
        ContactItemComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
