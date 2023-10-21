import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { CoverComponent } from './cover/cover.component';

const routes: Routes = [
    {
        path: "", loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
    },
    // {
    //     path: "cover",
    //     component: CoverComponent
    // },
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
