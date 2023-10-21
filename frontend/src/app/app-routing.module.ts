import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { AuthRequired } from './base_services/auth.guard';

const routes: Routes = [
    {
        path: "", 
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthRequired],
        canMatch: [AuthRequired],
    },
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "404",
        component: NotFoundComponent
    },
    { 
        path: "**",
        redirectTo: "404"
    }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
function mapToCanActivate(arg0: (typeof AuthRequired)[]): any {
    throw new Error('Function not implemented.');
}

