import { CommonModule } from "@angular/common";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { NgModule, OnDestroy } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MainComponent } from "./main.component";
import { MainRoutingModule } from "./main-routing.module";
import { HeaderComponent } from "./components/layout/header/header.component";
import { SidebarComponent } from "./components/layout/sidebar/sidebar.component";
import { UiModule } from "@ui";
import { SettingsComponent } from "./components/settings/settings.component";
import { XmppService } from "@lib";
import { AppState } from "../../store/store";
import { Store } from "@ngrx/store";
import { selectProfile } from "../../store/identity/selectors";
import { environment } from "../../../environments/environment.development";
import { Subscription } from "rxjs";

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
        XmppService,
        provideHttpClient(withInterceptorsFromDi())
    ]
})
export class MainModule {
    /*
    After login actions:
    +   Get profile
    -   connect to xmpp server
    -   check if user subscribed to notification node. If not, subscribe to a notification node.
    -   check if user subscribed to a Lobby. If not - propose to subscribe. If user is outcasted - do nothing.
    -   query all user rooms with online users in it.
    -   get roster with statuses.
    */
    constructor(private xmpp: XmppService, private store: Store<AppState>) {
        // client.on('session:started', async () => {
        //     try {
        //         await client.enableCarbons();
        //     } catch (err) {
        //         console.log('Server does not support carbons');
        //     }

        //     await client.getRoster();
        //     client.updateCaps();
        //     client.sendPresence({
        //         legacyCapabilities: client.disco.getCaps()
        //     });
        // });

        this.store.select(selectProfile).subscribe({
            next: profile => {
                if (profile) {
                    const jid = `${profile.identity.id}@${environment.XMPP_HOST}`
                    const token = profile.token.token
                    this.xmpp.connect(
                        jid,
                        token,
                        environment.XMPP_HOST
                    );
                }
            }
        })
    }
}
