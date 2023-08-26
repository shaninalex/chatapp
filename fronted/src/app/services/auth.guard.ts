import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { TokenService } from "./token.service";

@Injectable({
    providedIn: "root"
})
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private tokenService: TokenService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.tokenService.ifExist()) {
            return true
        }
        this.router.navigate(['/auth']);
        return false
    }
}