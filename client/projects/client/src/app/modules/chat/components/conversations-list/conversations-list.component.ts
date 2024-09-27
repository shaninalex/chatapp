import { Component } from "@angular/core";
import { UiConv, mock_conversations } from "@lib";
import { Store } from "@ngrx/store";
import { map, merge, Observable, of, scan } from "rxjs";
import { AppState } from "../../../../store/store";
import { selectRoomsAll } from "../../../../store/chat/reducers/rooms";


@Component({
    selector: 'app-conversations-list',
    template: `
<div class="w-80 shrink-0">
    <div class="bg-slate-100 mb-4 p-2 rounded-lg flex items-center justify-between">
        <button class="p-0 m-0 leading-none relative left-1" style="top: 1px" title="Compose">
            <i class="fa-regular fa-plus text-xl leading-none text-slate-600" aria-hidden="true"></i>
        </button>
        <input class="border rounded-lg bg-transparent px-2 w-3/4" placeholder="Search" />
    </div>

    <div class="flex flex-col gap-2 overflow-y-auto" style="height: calc(100vh - 11rem)">
        @for (item of (conversations$ | async); track $index) {
            <app-conv-item [conv]="item" />
        }
    </div>
</div>
    `
})
export class ConversationsListComponent {
    conversations$: Observable<UiConv[]>;

    constructor(private store: Store<AppState>) {
        this.conversations$ = merge(
            // IMPORTANT: Example data. Will be removed on CU-8695z23hy
            of(mock_conversations),

            // This is only for rooms, not for 1-to-1 conversations - this
            // things will be getting from another place
            this.store.select(selectRoomsAll).pipe(
                map(data => {
                    const convs: UiConv[] = data.map(d => ({
                        id: d.jid as string,
                        name: d.name as string,
                        time: new Date(),
                        preview: "",
                        unread: 0,
                        selected: false,
                        room: true,
                    }))
                    return convs
                })
            ),
        ).pipe(
            scan((acc: UiConv[], curr: UiConv[]) => [...acc, ...curr], []),
            map(convs => convs.sort((a: UiConv, b: UiConv) => b.time.getTime() - a.time.getTime()))
        )
    }
}
