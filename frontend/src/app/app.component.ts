import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from './shared/shared.module';

@Component({
    selector: '#root',
    standalone: true,
    imports: [
        CommonModule,
        RouterOutlet,
        SharedModule
    ],
    templateUrl: './app.component.html',
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    title = 'Memosynth';
}
