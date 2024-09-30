import { Component, Input } from "@angular/core";

@Component({
    selector: "ui-avatar",
    template: `
    @if ( image && image !== "" ) {
        <img class="w-{{ size }} h-{{ size }} rounded-full shrink-0" src="{{ image }}"/>
    } @else {
        <div class="w-{{ size }} h-{{ size }} bg-slate-200 rounded-full flex items-center justify-center overflow-hidden">
            <i class="fa-regular fa-user text-slate-500"></i>
        </div>
    }
`
})
export class UiAvatarComponent {
    @Input() image: string | undefined | null
    @Input() size: number;
}
