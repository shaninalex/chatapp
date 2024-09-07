import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { ErrorComponent } from './error/error.component';
import { ErrorPermissionComponent } from './error-permission/error-permission.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';


@NgModule({
    declarations: [
        NotFoundComponent,
        ErrorComponent,
        ErrorPermissionComponent,
        UnauthorizedComponent
    ],
    exports: [
        NotFoundComponent,
        ErrorComponent,
        ErrorPermissionComponent,
        UnauthorizedComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
    ],
})
export class PagesModule { }
