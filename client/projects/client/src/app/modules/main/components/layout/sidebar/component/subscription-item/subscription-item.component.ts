import { Component, Input } from "@angular/core";
import { ReceivedPresence } from "stanza/protocol";

@Component({
    selector: 'app-subscription-item',
    templateUrl: './subscription-item.component.html'
})
export class SubscriptionItemComponent { 
    @Input() subscription: ReceivedPresence;
}