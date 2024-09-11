import { Component, Input } from "@angular/core";
import { UiNode } from "@ory/kratos-client";

@Component({
    selector: 'app-tab-form',
    templateUrl: './tab-form.component.html'
})
export class TabFormComponent {
    @Input() action: string;
    @Input() method: string;
    @Input() default_nodes: UiNode[];
    @Input() target_nodes: UiNode[];
}
