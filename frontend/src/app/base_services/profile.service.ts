import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, shareReplay, map} from "rxjs";

@Injectable()
export class ProfileService {
    constructor(private http: HttpClient) {}

    getProfile(): Observable<any> {
        return this.http.get<any>("/api/v2/profile").pipe(
            shareReplay()
        )
    }
}