
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login.component';
import { AuthService } from './auth.service';
import { UiModule } from '@ui';
import { VerificationComponent } from './verification.component';
import { RegistrationComponent } from './registration.component';
import { RecoveryComponent } from './recovery.component';
import { ErrorComponent } from './error.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';


@NgModule({
    declarations: [
        AuthComponent,
        LoginComponent,
        VerificationComponent,
        RegistrationComponent,
        RecoveryComponent,
        ErrorComponent,
    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        RouterModule,
        UiModule,
        ReactiveFormsModule,
    ],
    providers: [
        AuthService,
        provideHttpClient(withInterceptorsFromDi())
    ]
})
export class AuthModule { }
