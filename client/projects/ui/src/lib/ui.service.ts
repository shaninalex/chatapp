import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UiService {
    public title: BehaviorSubject<string> = new BehaviorSubject<string>("Login");

    // for sending form and waiting result etc. More local loading indicator
    public loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

    // appLoading for global application loading, gathering information before showing ui
    public appLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

    public selectedConversation$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

    constructor() {
        this.title.subscribe({
            next: (title: string) => {
                document.title = `ChatApp - ${title}`;
            }
        })
    }
}
