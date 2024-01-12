import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { IDashboardState } from "../../store/store";
import { selectContactsList } from "../../store/contacts.selectors";

@Component({
  selector: "#app-sidebar",
  templateUrl: "sidebar.component.html"
})
export class SidebarComponent {
  users$: Observable<any[]>;

  constructor(private store: Store<IDashboardState>) {
    this.users$ = this.store.select(selectContactsList);
    this.users$.subscribe({
      next: data => console.log(data)
    })
  }

  selectConversation(jid: string): void {
    // this.store.dispatch(selectConversation({jid}))
  }
}
