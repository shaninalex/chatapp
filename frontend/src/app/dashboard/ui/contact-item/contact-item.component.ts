import { Component, Input } from '@angular/core';
import { ContactItem } from '../../typedefs';

@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html'
})
export class ContactItemComponent {
    @Input() contact: ContactItem;
}
