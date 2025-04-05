import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {RouterLink} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {Subscription} from 'rxjs';
import {animate, state, style, transition, trigger, query, animateChild, group} from '@angular/animations';
import {UiService} from '../../services/ui.service';
import {SIDEBAR_STATE} from '../../services/interfaces';

@Component({
    selector: 'ch-sidebar',
    imports: [
        RouterLink,
        MatListModule,
        MatIconModule,
        MatButtonModule,
    ],
    templateUrl: './sidebar.component.html',
    providers: [{provide: SIDEBAR_STATE, useClass: UiService}],
    animations: [
        trigger('openClose', [
            state('*', style({ width: '14rem' })),
            state('open', style({ width: '14rem' })),
            state('closed', style({  width: '5rem' }) ),
            transition('* => closed', [group([animate('0.1s'), query('@fadeInOut', animateChild())])]),
            transition('* => open', [group([animate('0.1s'), query('@fadeInOut', animateChild())])]),
        ]),
        trigger('fadeInOut', [
            state('open', style({ opacity: 1 })),
            state('closed', style({ opacity: 0 })),
            transition('* => closed', [animate('0.1s')]),
            transition('* => open', [animate('0.1s')]),
        ]),
    ]
})
export class SidebarComponent implements OnInit, OnDestroy {
    sidebarOpen: boolean = true;
    private sidebarSub: Subscription | undefined;
    private uiService = inject(UiService)
    menu = [
        {
            icon: "forum",
            label: "Messages"
        },
        {
            icon: "group",
            label: "Friends"
        },
    ]

    ngOnInit() {
        this.sidebarSub = this.uiService.sidebarOpen$.subscribe((isOpen) => {
            this.sidebarOpen = isOpen;
        });
    }

    ngOnDestroy(): void {
        if (this.sidebarSub) {
            this.sidebarSub.unsubscribe();
        }
    }
}
