import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css']
})
export class ContactItemComponent {
    @Input() active: boolean;
    @Input() unreadCount: number|undefined;
    @Input() timeElapsed: string|undefined;
}
