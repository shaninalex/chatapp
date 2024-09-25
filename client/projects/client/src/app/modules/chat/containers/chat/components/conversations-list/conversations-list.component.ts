import { Component } from "@angular/core";
import { Conv, mock_conversations } from "@lib";
import { Observable, of } from "rxjs";


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
    // rxjs scan operator ( video: RxJS Scan Operator - How to Manage the State ) 
    // Sort by conv.time DESC
    conversations$: Observable<Conv[]> = of(mock_conversations)
}
