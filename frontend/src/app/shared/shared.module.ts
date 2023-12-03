import { NgModule } from "@angular/core";
import { UiService } from "./services/ui.service";
import { MessagesService } from "./services/messages.service";

@NgModule({
    
    providers: [
        UiService,
        MessagesService
    ]
})
export class SharedModule {}