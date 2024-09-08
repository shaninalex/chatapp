import { CommonModule } from "@angular/common";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MainComponent } from "./main.component";
import { MainRoutingModule } from "./main-routing.module";
import { HeaderComponent } from "./components/layout/header/header.component";
import { SidebarComponent } from "./components/layout/sidebar/sidebar.component";
import { UiModule } from "@ui";
import { SettingsComponent } from "./components/settings/settings.component";

@NgModule({
    declarations: [
        MainComponent,
        SettingsComponent,

        // layout
        HeaderComponent,
        SidebarComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MainRoutingModule,
        UiModule,
    ],
    providers: [
        provideHttpClient(withInterceptorsFromDi())
    ]
})
export class MainModule {
    /*
    After login actions:
    +   Get profile
    -   check if user subscribed to notification node. If not, subscribe to a notification node.
    -   check if user subscribed to a Lobby. If not - propose to subscribe. If user is outcasted - do nothing.
    -   query all user rooms with online users in it.
    -   get roster with statuses.
    */
}
