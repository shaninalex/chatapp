import { Component } from "@angular/core";
import { Room } from "@lib";
import { Store } from "@ngrx/store";
import { BehaviorSubject, combineLatest, map, Observable } from "rxjs";
import { AppState } from "../../../../store/store";

import { Router } from "@angular/router";
import { selectRoomsAll } from "../../../../store/chat/selectors/rooms";
import { ChatRoomsSelect } from "../../../../store/chat/actions";


@Component({
    selector: 'app-conversations-list',
    template: `
<div class="w-80 shrink-0">
    <div class="bg-slate-100 mb-4 p-2 rounded-lg flex items-center justify-between">
        <button class="p-0 m-0 leading-none relative left-1" style="top: 1px" title="Compose">
            <i class="fa-regular fa-plus text-xl leading-none text-slate-600" aria-hidden="true"></i>
        </button>
        <input [(ngModel)]="searchValue" class="border rounded-lg bg-transparent px-2 w-3/4" placeholder="Search" />
    </div>

    <div class="flex flex-col gap-2 overflow-y-auto" style="height: calc(100vh - 11rem)">
        @for (item of (rooms$ | async); track $index) {
            <chat-room-item [conv]="item" (onClick)="handleOnClick($event)" />
        }
    </div>
</div>
    `
})
export class ConversationsListComponent {
    rooms$: Observable<Room[]>;
    private searchSubject: BehaviorSubject<string> = new BehaviorSubject<string>("");

    constructor(private store: Store<AppState>, private router: Router) {
        // select rooms without parent
        const _root_rooms$ = this.store.select(selectRoomsAll).pipe(
            map(rooms => rooms
                .filter(room => room.parent === null)
            ),
        );

        // filter if needed by search subject
        this.rooms$ = combineLatest([_root_rooms$, this.searchSubject]).pipe(
            map(([rooms]) => rooms
                .filter(room => room.name.toLowerCase().includes(this.searchValue.toLowerCase()))
            )
        )
    }

    get searchValue(): string {
        return this.searchSubject.getValue()
    }

    set searchValue(value: string) {
        this.searchSubject.next(value)
    }

    handleOnClick(id: string) {
        this.router.navigate(["chat", id]);
        this.store.dispatch(ChatRoomsSelect({
            payload: {
                id: id,
                changes: {
                    selected: true
                }
            }
        }))
    }
}
