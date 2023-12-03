import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './pages/login.component';
import { RegistrationComponent } from './pages/registration.component';
import { VerificationComponent } from './pages/verification.component';
import { RecoveryComponent } from './pages/recovery.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { GeneratedFormComponent } from './components/generated-form.component';
import { ReactiveFormsModule } from '@angular/forms';

const AUTH_ROUTES: Routes = [{
    path: "",
    component: AuthComponent,
    children: [
        { path: "login", component: LoginComponent },
        { path: "registration", component: RegistrationComponent },
        { path: "verification", component: VerificationComponent },
        { path: "recovery", component: RecoveryComponent },
        { path: "", redirectTo: "login", pathMatch: 'full' }
    ]
}];



@NgModule({
    declarations: [
        AuthComponent,
        LoginComponent,
        RegistrationComponent,
        VerificationComponent,
        RecoveryComponent,
        GeneratedFormComponent,
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        SharedModule,
        ReactiveFormsModule,
        RouterModule.forChild(AUTH_ROUTES)
    ],
    providers: [
        AuthService
    ]
})
export class AuthModule { }
