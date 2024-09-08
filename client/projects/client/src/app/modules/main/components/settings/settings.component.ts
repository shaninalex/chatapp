import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../store/store";
import { selectLogoutLink, selectSettings } from "../../../../store/identity/selectors";
import { GetLogoutLinkStart, GetSettingsStart } from "../../../../store/identity/actions";
import { map } from "rxjs";
import { FormBuilder, FormGroup } from "@angular/forms";
import { UiNode, UiText } from "@ory/kratos-client";
import { setFormControllsFromNodes } from "@lib";

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {
    logoutLink: string
    form: FormGroup;
    nodes: Array<UiNode> = [];
    actionUrl: string;
    messages?: Array<UiText>;

    constructor(private store: Store<AppState>, public fb: FormBuilder) {
        this.form = this.fb.group({})
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
                    this.nodes = settings.ui.nodes;
                    this.actionUrl = settings.ui.action;
                    this.messages = settings.ui.messages;
                    setFormControllsFromNodes(settings.ui.nodes, this.form)
                }
            }
        })
    }
}
