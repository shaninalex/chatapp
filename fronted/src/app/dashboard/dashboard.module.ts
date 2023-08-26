import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './ui/header/header.component';

const routes: Routes = [
    {
        path: "",
        component: DashboardComponent
    }
]

@NgModule({
    declarations: [
        DashboardComponent,
        HeaderComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ]
})
export class DashboardModule { }
