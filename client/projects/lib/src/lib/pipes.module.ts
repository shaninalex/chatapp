import { NgModule } from "@angular/core";
import { NameFromJIDPipe, SubRoomNamePipe } from "./pipes";

@NgModule({
    imports: [

    ],
    declarations: [
        SubRoomNamePipe,
        NameFromJIDPipe
    ],
    exports: [
        SubRoomNamePipe,
        NameFromJIDPipe
    ]
})
export class LibPipesModule { }
