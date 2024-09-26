import { Component, Input } from "@angular/core";
import {UiCollocutorItem} from "@lib";


@Component({
    selector: "app-collocutor-item",
    template: `
<div class="flex items-center justify-between gap-2">
    <div class="flex gap-2 p-2" (click)="handleClick()">
        @if (item.image) {
            <img class="w-6 h-6 rounded-full shrink-0" src="{{ item.image }}" />
        } @else {
            <div class="w-6 h-6 bg-slate-300 rounded-full flex items-center justify-center">
                <i class="fa fa-user text-slate-500"></i>
            </div>
        }
        {{ item.name }}
    </div>
    <button class="collocutor-menu bg-slate-100 rounded-lg px-2">
        <i class="fa-solid fa-ellipsis"></i>
    </button>
</div>
`,
    styles: [`
        :host:hover .collocutor-menu {
            opacity: 1
        }
        .collocutor-menu {
            opacity: 0
        }
    `]
})
export class CollocutorItemComponent {
    @Input() item: UiCollocutorItem

    handleClick() {

    }
}
