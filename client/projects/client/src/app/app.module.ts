import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesModule } from './lib/pages/pages.module';
import { UiModule } from '@ui';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        PagesModule,
        UiModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
