import { NgModule } from '@angular/core';
import { FormMessagesComponent } from './form-messages/form-messages.component';
import { KratosInputComponent } from './kratos-input/kratos-input.component';


@NgModule({
    declarations: [
        FormMessagesComponent,
        KratosInputComponent,
    ],
    imports: [
    ],
    exports: [
        FormMessagesComponent,
        KratosInputComponent,
    ]
})
export class UiModule { }
