import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';

import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
    { path: "", component: AuthComponent, children: [
        {path: "", component: LoginComponent },
        {path: "register", component: RegisterComponent },
    ]}
];

@NgModule({
    declarations: [
        AuthComponent,
        LoginComponent,
        RegisterComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        HttpClientModule,
        ReactiveFormsModule,
        CommonModule
    ]
})
export class AuthModule { }
