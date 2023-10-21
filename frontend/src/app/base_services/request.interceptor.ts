import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, catchError, of } from "rxjs";


@Injectable()
export class RequestInterceptor implements HttpInterceptor {
    constructor(private router: Router) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError(err => {
                if (err.status !== 200) {
                    this.router.navigate(['/login']);

                }
                return of('error', err);
            })
        )
    }
}