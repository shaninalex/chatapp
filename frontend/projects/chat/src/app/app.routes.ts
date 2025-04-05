import { Routes } from '@angular/router';
import {PageHomeComponent, PageLoginComponent} from '@chat/pages';

export const routes: Routes = [
    {
        path: "",
        component: PageHomeComponent,
    },
    {
        path: "auth/login",
        component: PageLoginComponent,
    },
];
