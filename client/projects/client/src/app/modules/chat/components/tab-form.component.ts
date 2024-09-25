import { Component, Input } from "@angular/core";
import { UiNode } from "@ory/kratos-client";

@Component({
    selector: 'app-tab-form',
    template: `
        <form [action]="action" [method]="method" class="flex flex-col gap-4 mb-3">
            @for (node of default_nodes; track node) {
                <ui-kratos-input [node]="node" />
            }

            @for (node of target_nodes; track node) {
                <ui-kratos-input [node]="node" />
            }
        </form>
    `
})
export class TabFormComponent {
    @Input() action: string;
    @Input() method: string;
    @Input() default_nodes: UiNode[];
    @Input() target_nodes: UiNode[];
}
