import { Component, Input } from "@angular/core";
import {CollocutorItem} from "@lib";


@Component({
    selector: "app-collocutor-item",
    template: `
<div class="flex gap-2 p-2 rounded-lg hover:bg-slate-100 cursor-pointer" (click)="handleClick()">
    @if (item.image) {
        <img class="w-6 h-6 rounded-full shrink-0" src="{{ item.image }}" />
    } @else {
        <div class="w-6 h-6 bg-slate-300 rounded-full flex items-center justify-center">
            <i class="fa fa-user text-slate-500"></i>
        </div>
    }
    {{ item.name }}
</div>
`
})
export class CollocutorItemComponent {
    @Input() item: CollocutorItem

    handleClick() {

    }
}
