import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, catchError, finalize, map, of, shareReplay } from "rxjs";
import { inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../../store/identity/reducer";
import { SetIdentity } from "../../store/identity/actions";
import { HttpClient } from "@angular/common/http";
import { UiService } from "../services/ui.service";


export function CanActiveteAccountPage(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> |
    Promise<boolean | UrlTree> |
    boolean |
    UrlTree
{
    const router = inject(Router);
    const http = inject(HttpClient);
    const store = inject(Store<AppState>);
    const ui = inject(UiService);

    const session = http.get<any>(`/api/v2/auth/session`, { withCredentials: true }).pipe(
        finalize(() => ui.loading.next(false)),
        shareReplay()
    );

    return <Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree>session.pipe(
        map((data) => {
            if (data) store.dispatch(SetIdentity({user_info: data}));
            return of(true);
        }),
        catchError((err) => {
            if (err.status === 401) return router.navigate(["/auth/login"]);
            return of(err)
        }),
    );
}
