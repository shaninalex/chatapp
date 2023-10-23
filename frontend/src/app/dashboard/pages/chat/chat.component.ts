import { Component } from '@angular/core';
import { ContactItem } from '../../typedefs';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})
export class ChatComponent {

    contacts: ContactItem[] = [
        { name: "John Doe", new: true, unread_counter: 2, active: true },
        { name: "Janet Adebayo", new: false, active: false },
        { name: "Kunle Adekunle", new: true, unread_counter: 4, active: false },
        { name: "John Doe", new: false, active: false },
        { name: "Janet Adebayo", new: false, active: false },
        { name: "Kunle Adekunle", new: false, unread_counter: 1, active: false },
        { name: "John Doe", new: false, active: false },
    ]
}
