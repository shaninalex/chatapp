import {Component, inject} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {SIDEBAR_STATE} from '../../services/interfaces';
import {UiService} from '../../services/ui.service';

@Component({
    selector: 'ch-header',
    imports: [
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
    ],
    templateUrl: './header.component.html',
    providers: [
        {
            provide: SIDEBAR_STATE,
            useClass: UiService,
        }
    ]
})
export class HeaderComponent {
    private uiService = inject(UiService)

    toggle(): void {
        this.uiService.toggleSidebar()
    }
}
