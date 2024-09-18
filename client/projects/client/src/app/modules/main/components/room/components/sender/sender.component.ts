import { Component, Input } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { XmppService } from "../../../../../../lib/services/xmpp.service";

export interface ISenderForm {
    body: FormControl<string>
}

@Component({
    selector: 'app-sender',
    templateUrl: './sender.component.html'
})
export class SenderComponent {
    @Input() roomJid: string;
    form: FormGroup;
    
    constructor(private xmpp: XmppService) {
        this.form = new FormGroup({
            body: new FormControl<string>("", Validators.required),
        })
    }

    onSubmit(): void {
        if (!this.form.valid) {
            return
        }
        this.xmpp.sendRoomMessage(
            this.roomJid, 
            this.form.controls["body"].value, 
            this.xmpp.userID,
        ).subscribe()
        this.form.reset()
    }
}