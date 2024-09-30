import { NgModule } from '@angular/core';
import { FormMessagesComponent } from './form-messages/form-messages.component';
import { KratosInputComponent } from './kratos-input/kratos-input.component';
import { UiAvatarComponent } from './avatar.component';

@NgModule({
    imports: [],
    declarations: [
        FormMessagesComponent,
        KratosInputComponent,
        UiAvatarComponent,
    ],
    exports: [
        FormMessagesComponent,
        KratosInputComponent,
        UiAvatarComponent,
    ]
})
export class UiModule { }

