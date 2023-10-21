import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";


@Injectable({
    providedIn: 'root'
})
class PermissionsService {

    constructor(private router: Router) { }
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        

        return true
    }
}

export const AuthRequired: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
    return inject(PermissionsService).canActivate(next, state);
}