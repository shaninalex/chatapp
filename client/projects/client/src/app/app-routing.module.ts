import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './lib/pages/error/error.component';
import { UnauthorizedComponent } from './lib/pages/unauthorized/unauthorized.component';
import { ErrorPermissionComponent } from './lib/pages/error-permission/error-permission.component';
import { NotFoundComponent } from './lib/pages/not-found/not-found.component';
import { AuthGuard } from './lib/guards/auth.guard';

const routes: Routes = [

    {
        path: "auth",
        loadChildren: () => import("./modules/auth/auth.module").then(m => m.AuthModule),
    },
    { path: "400", component: ErrorComponent },
    { path: "401", component: UnauthorizedComponent },
    { path: "403", component: ErrorPermissionComponent },
    { path: "404", component: NotFoundComponent },
    {
        path: "",
        loadChildren: () => import("./modules/chat/chat.module").then(m => m.ChatModule),
        canMatch: [AuthGuard]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
