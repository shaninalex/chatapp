import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TokenService {

    constructor() { }

    ifExist(): boolean {
        return !!localStorage.getItem("access_token")
    }

    saveToken(token: string): void {
        localStorage.setItem("access_token", token);
    }

    removeAccessToken(): void {
        localStorage.removeItem("access_token");
    }
}
