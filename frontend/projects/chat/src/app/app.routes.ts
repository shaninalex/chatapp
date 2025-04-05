import { Routes } from '@angular/router';
import {PageHomeComponent} from '../pages/home/home.component';
import {PageLoginComponent} from '../pages/login/login.component';

export const routes: Routes = [
    {
        path: "",
        component: PageHomeComponent,
    },
    {
        path: "login",
        component: PageLoginComponent,
    },
];
