
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login.component';
import { VerificationComponent } from './verification.component';
import { RecoveryComponent } from './recovery.component';
import { RegistrationComponent } from './registration.component';
import { ErrorComponent } from './error.component';

const routes: Routes = [
    {
        path: "",
        component: AuthComponent,
        children: [
            {
                path: "login",
                component: LoginComponent
            },
            {
                path: "verification",
                component: VerificationComponent
            },
            {
                path: "registration",
                component: RegistrationComponent
            },
            {
                path: "recovery",
                component: RecoveryComponent
            },
            {
                path: "error",
                component: ErrorComponent
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
