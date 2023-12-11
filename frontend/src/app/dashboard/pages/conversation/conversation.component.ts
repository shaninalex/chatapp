import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IDashboardState } from '../../store';
import { selectConversation } from '../../store/chat/chat.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: '#app-conversation',
  templateUrl: './conversation.component.html'
})
export class ConversationComponent {
  conversationJid$: Observable<string | null>;

  constructor(private store: Store<IDashboardState>) {
    this.conversationJid$ = this.store.select(selectConversation);
  }

}
