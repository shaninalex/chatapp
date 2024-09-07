/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UiNode, UiNodeAttributes, UiNodeInputAttributes } from "@ory/kratos-client";

export function nodeAttributes(attributes: UiNodeAttributes): any {
    return attributes as any
}

export function hasValue(attributes: any): attributes is UiNodeInputAttributes {
    return attributes.value !== undefined
}

/**
* Return typed attributes object by given object. Basicaly if attributes contain field value or name='password' this is
* an signal that given object is UiNodeInputAttributes. Note: Kratos does not return password value back to the fronend
* That's why we need to check name.
* @summary Return typed attributes object by given object.
* @param {any} attributes - attributes can be anything of this  types - UiNodeAnchorAttributes, UiNodeImageAttributes, UiNodeInputAttributes, UiNodeScriptAttributes, UiNodeTextAttributes
* @return {UiNodeInputAttributes | null} Return UiNodeInputAttributes or null if condition does not exists
*/
export function getUiNodeInputAttributes(attributes: any): UiNodeInputAttributes | null {
    if (hasValue(attributes) || nodeAttributes(attributes).name === 'password') {
        return attributes as UiNodeInputAttributes
    }
    return null
}

export function setFormControllsFromNodes(nodes: Array<UiNode>, form: FormGroup) {
    for (let i = 0; i <= nodes.length; i++) {
        const node = nodes[i];
        if (node) {
            const attributes: UiNodeInputAttributes = getUiNodeInputAttributes(node.attributes) as UiNodeInputAttributes;
            if (attributes) {
                form.addControl(
                    attributes.name,
                    new FormControl(
                        attributes.name !== "password" ? attributes.value : null,
                        Validators.required
                    )
                )
                if (attributes.type === 'email') {
                    form.controls[attributes.name].addValidators(Validators.email)
                }
            }
        }

    }
}

// switch (this.node.attributes.node_type) {
//     case 'a':
//         return this.node.attributes as UiNodeAnchorAttributes;
//     case 'img':
//         return this.node.attributes as UiNodeImageAttributes;
//     case 'input':
//         return this.node.attributes as UiNodeInputAttributes;
//     case 'script':
//         return this.node.attributes as UiNodeScriptAttributes;
//     case 'text':
//         return this.node.attributes as UiNodeTextAttributes;
//     default:
//         throw new Error("Unknown node type");
// }
