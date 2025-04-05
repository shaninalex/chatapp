import {Component, inject} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {ActivatedRoute, Params} from '@angular/router';
import { environment } from '@chat/environments/environment.development';
import {AuthService} from '@chat/features/auth';
import {LoginFlow} from '@ory/kratos-client';
import {filter, map, Observable, switchMap} from 'rxjs';
import {ApiResponse} from '@chat/shared/api';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {AsyncPipe} from '@angular/common';

@Component({
    selector: 'ch-auth-login',
    imports: [
        MatCardModule,
        MatProgressSpinnerModule,
        AsyncPipe,
    ],
    providers: [AuthService],
    template: `
        @if (loginFlow$ | async; as loginFlow) {
            <mat-card appearance="outlined">
                <mat-card-content>
                    <form [action]="loginFlow.ui.action" method="post" class="d-flex flex-column">
                        TODO: render form
                    </form>
                </mat-card-content>
            </mat-card>
        } @else {
            <mat-spinner/>
        }`
})
export class LoginComponent {
    private route: ActivatedRoute = inject(ActivatedRoute);
    private authService: AuthService = inject(AuthService);

    loginFlow$: Observable<LoginFlow | null> = this.route.queryParams.pipe(
        map((params: Params) => {
            if (!params.hasOwnProperty("flow")) {
                window.location.href = environment.AUTH_URL_LOGIN_REDIRECT;
                return null;
            }
            return params["flow"];
        }),
        filter((flowId) => flowId !== null),
        switchMap((flowId: string) => this.authService.GetLoginForm(flowId).pipe(
            map((data: ApiResponse<LoginFlow>) => data.data)
        ))
    );
}
