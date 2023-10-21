import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RequestInterceptor } from './base_services/request.interceptor';
import { ProfileService } from './base_services/profile.service';
import { LoginComponent } from './login/login.component';

@NgModule({
    declarations: [
        AppComponent,
        NotFoundComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RequestInterceptor,
            multi: true
        },
        ProfileService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
