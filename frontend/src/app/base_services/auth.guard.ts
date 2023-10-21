import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { ProfileState } from "../store/profile/profile.reducer";
import { selectProfileExists } from "../store/profile/profile.selectors";
import { Observable, catchError, map, tap } from "rxjs";


@Injectable({
    providedIn: 'root'
})
class PermissionsService {

    constructor(
        private router: Router,
        private store: Store<ProfileState>
    ) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.store.select(selectProfileExists).pipe(
            tap((user_exist:boolean) => {
                if (!user_exist) this.router.navigate(["/login"]);
            })
        );
    }
}

export const AuthRequired: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => {
    return inject(PermissionsService).canActivate(next, state);
}