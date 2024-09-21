import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../store/store";
import { selectLogoutLink, selectSettings } from "../../../../store/identity/selectors";
import { GetLogoutLinkStart, GetSettingsStart } from "../../../../store/identity/actions";
import { FormBuilder } from "@angular/forms";
import { UiNode, UiText } from "@ory/kratos-client";

type SettingsTabs = "profile" | "password" | "oidc" | "totp"

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {
    logoutLink: string
    actionUrl: string;
    method: string;
    messages?: Array<UiText>;
    tab: SettingsTabs = "profile";

    nodes_profile: Array<UiNode>;
    nodes_password: Array<UiNode>;
    nodes_totp: Array<UiNode>;
    nodes_oidc: Array<UiNode>;
    nodes_default: Array<UiNode>;

    constructor(private store: Store<AppState>, public fb: FormBuilder) {
        this.store.dispatch(GetLogoutLinkStart())
        this.store.dispatch(GetSettingsStart())
        this.store.select(selectLogoutLink).subscribe({
            next: data => {
                if (data) this.logoutLink = data.logout_url
            }
        })
    }

    ngOnInit(): void {
        this.store.select(selectSettings).subscribe({
            next: settings => {
                if (settings) {
                    this.actionUrl = settings.ui.action;
                    this.method = settings.ui.method;
                    this.messages = settings.ui.messages;

                    this.nodes_default = settings.ui.nodes.filter((node: UiNode) => node.group === "default");
                    this.nodes_profile = settings.ui.nodes.filter((node: UiNode) => node.group === "profile")
                    this.nodes_password = settings.ui.nodes.filter((node: UiNode) => node.group === "password");
                    this.nodes_oidc = settings.ui.nodes.filter((node: UiNode) => node.group === "oidc");
                    this.nodes_totp = settings.ui.nodes.filter((node: UiNode) => node.group === "totp" || node.group === "lookup_secret");
                }
            }
        })
    }

    changeTab(tab_name: SettingsTabs): void {
        this.tab = tab_name
    }
}
