import { Component, Input } from "@angular/core";
import { Conv } from "@lib";


@Component({
    selector: "app-conv-item",
    template: `
<div class="flex gap-2 p-2 rounded-lg hover:bg-slate-100 cursor-pointer"
    [ngClass]="{'bg-slate-100': conv.selected }">
    @if (conv.image) {
        <img class="w-6 h-6 rounded-full shrink-0" src="{{ conv.image }}" />
    } @else {
        <div class="w-6 h-6 bg-slate-300 rounded-full flex items-center justify-center">
            <i class="fa fa-user text-slate-500"></i>
        </div>
    }
    <div class="flex-grow">
        <div class="flex justify-between items-center mb-1">
            <div>
                {{ conv.name }}
                @if (conv.room === true) {
                    <i class="fa-solid fa-user-group text-slate-500"></i>
                }
            </div>
            <div class="text-sm text-slate-500">{{ conv.time | date: 'H:mm'}}</div>
        </div>
        @if (conv.preview !== "") {
            <div class="flex justify-between items-center text-sm">
                <div class="text-slate-500">{{ conv.preview | slice: 0:30 }}...</div>
                @if (conv.unread > 0) {
                    <div class="rounded-xl bg-violet-300 px-2">{{ conv.unread}}</div>
                    }
            </div>
        }
    </div>
</div>
`
})
export class ConvItemComponent {
    @Input() conv: Conv
}

