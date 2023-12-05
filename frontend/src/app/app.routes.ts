import { Routes } from '@angular/router';
import { CanActiveteAccountPage } from './shared/guards/auth.guard';

export const routes: Routes = [
    {
        path: "auth",
        loadChildren: () => import("./auth/auth.module").then(c => c.AuthModule),
    },
    {
        path: "app",
        // canLoad: [CanActiveteAccountPage],
        loadChildren: () => import("./dashboard/dashboard.module").then(c => c.DashboardModule),
    },
    {
        path: "404",
        loadComponent: () => import("./static/404/404.component").then(c => c.NotFoundComponent)
    },
    {
        path: "error",
        loadComponent: () => import("./static/error/error.component").then(c => c.ErrorComponent)
    },
    {
        path: "", redirectTo: "app", pathMatch: 'full'
    },
    {
        path: "**", redirectTo: "404"
    }
];
