import { CommonModule } from "@angular/common";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MainComponent } from "./main.component";
import { MainRoutingModule } from "./main-routing.module";

@NgModule({
    declarations: [
        MainComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MainRoutingModule,
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
