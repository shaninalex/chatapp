/* eslint-disable @typescript-eslint/no-explicit-any */

// Since we don't know what type of node attribute is
// I need to disable any type checking for this file
import { Component, Input } from "@angular/core";
import { UiNode, UiNodeAttributes } from "@ory/kratos-client";

function nodeAttributes(attributes: UiNodeAttributes): any {
    return attributes as any
}

@Component({
    selector: 'ui-kratos-input',
    templateUrl: './kratos-input.component.html',
})
export class KratosInputComponent { // implements OnInit {
    @Input() node: UiNode;
    condition: boolean = true;

    // @HostBinding("class") private get hostClass(): string {
    //     return this.attr().type === "hidden" ? "d-none" : "";
    // }

    attr(): any {
        return nodeAttributes(this.node.attributes)
    }
}

