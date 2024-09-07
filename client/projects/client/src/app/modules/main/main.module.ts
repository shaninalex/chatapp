import { CommonModule } from "@angular/common";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MainComponent } from "./main.component";
import { MainRoutingModule } from "./main-routing.module";

@NgModule({
    declarations: [
        MainComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MainRoutingModule,
    ],
    providers: [
        provideHttpClient(withInterceptorsFromDi())
    ]
})
export class MainModule { }
