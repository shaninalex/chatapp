import { Component, Input } from "@angular/core";
import { Store } from "@ngrx/store";
import { MUCUserItem, ReceivedPresence } from "stanza/protocol";
import { AppState } from "../../../../../../store/store";
import { selectParticipantsByRoom } from "../../../../../../store/chat/reducers/participants";

@Component({
    selector: 'app-participants',
    templateUrl: './participants.component.html'
})
export class ParticipantsComponent {
    @Input() roomJid: string;
    participants: ReceivedPresence[] = [];
    
    constructor(private store: Store<AppState>) { }
    
    ngOnInit(): void {
        this.store.select(selectParticipantsByRoom(this.roomJid)).subscribe({
            next: p => this.participants = p
        })
    }

    meta(p: ReceivedPresence) {
        if (p.muc) {
            const muc: MUCUserItem = p.muc as MUCUserItem
            return `${muc.affiliation} | ${muc.role}`
        }
        return ""
    }

    name(p: ReceivedPresence) {
        return p.from.replace(this.roomJid + '/', '')
    }
}
