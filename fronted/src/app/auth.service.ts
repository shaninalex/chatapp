import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, shareReplay, tap } from "rxjs";
import { TokenService } from "./token.service";

export interface RegisterPayload {
    email: string
    password: string
}

export interface LoginPayload {
    email: string
    password: string
}


export interface LoginResponse {
    access_token: string
    exp: number
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient,
                private tokenService: TokenService,
                private router: Router) {}

    register(register_payload: RegisterPayload): Observable<any> {
        return this.http.post<any>("/api/v2/register", register_payload).pipe(
            shareReplay()
        )
    }

    login(login_payload: LoginPayload): Observable<any> {
        return this.http.post<LoginResponse>("/api/v2/login", login_payload).pipe(
            shareReplay(),
            tap(result => {
                if(result) {
                    this.tokenService.saveToken(result.access_token);
                    this.router.navigate(['/']);
                }
            })
        )
    }
}
