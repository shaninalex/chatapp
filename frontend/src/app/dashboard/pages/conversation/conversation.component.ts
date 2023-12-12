import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IDashboardState } from '../../store';
import { selectConversation } from '../../store/chat/chat.selectors';
import { Observable, tap } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { XmppService } from '../../services/xmpp.service';

@Component({
  selector: '#app-conversation',
  templateUrl: './conversation.component.html'
})
export class ConversationComponent {
  conversationJid$: Observable<string | null>;
  conversationJid: string;
  messageForm = new FormGroup({
    'message': new FormControl('', Validators.required),
  });

  constructor(
    private store: Store<IDashboardState>,
    private xmpp: XmppService,
  ) {
    this.conversationJid$ = this.store.select(selectConversation).pipe(
      tap(data => {
        this.conversationJid = data as string;
      })
    );
  }

  onSubmitMessage(): void {
    if (this.messageForm.valid) {
      this.xmpp.sendMessage(this.conversationJid, this.messageForm.value.message as string);
      this.messageForm.reset();
    }
  }

}
