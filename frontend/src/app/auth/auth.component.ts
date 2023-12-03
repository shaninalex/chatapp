import { AfterContentChecked, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UiService } from '../shared/services/ui.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrl: './auth.component.scss',
    encapsulation: ViewEncapsulation.None
})
export class AuthComponent implements AfterContentChecked {
    loading$: Observable<boolean>;

    constructor(private ui: UiService, private cdref: ChangeDetectorRef) {}
    
    ngAfterContentChecked(): void {
        this.loading$ = this.ui.loading;
        this.cdref.detectChanges();
    }
}
