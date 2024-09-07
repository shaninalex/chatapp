import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { EMPTY, Observable, catchError, finalize, shareReplay } from "rxjs";
import { FlowError, LoginFlow, RecoveryFlow, RegistrationFlow, VerificationFlow } from "@ory/kratos-client";
import { ApiResponse } from "@lib";
import { UiService } from "@ui";


// TODO:
// Refactor code to remove masive duplications
@Injectable()
export class AuthService {
    constructor(
        private http: HttpClient,
        private uiService: UiService
    ) { }

    public GetLoginForm(flow: string | null = null): Observable<ApiResponse<LoginFlow>> {
        let params = new HttpParams();
        if (flow) params = params.append("flow", flow);
        this.uiService.loading.next(true)
        return this.http.get<ApiResponse<LoginFlow>>("/api/auth/login", { params: params, withCredentials: true }).pipe(
            shareReplay(),
            finalize(() => this.uiService.loading.next(false)),
            catchError((error: HttpErrorResponse) => {
                // if form is gone - redirect and get new form
                if (error.status == 410) {
                    window.location.href = "/api/auth/login";
                }
                return EMPTY;
            })
        );
    }

    public GetRegistrationForm(flow: string | null = null): Observable<ApiResponse<RegistrationFlow>> {
        let params = new HttpParams();
        if (flow) params = params.append("flow", flow);
        this.uiService.loading.next(true)
        return this.http.get<ApiResponse<RegistrationFlow>>("/api/auth/registration", { params: params, withCredentials: true }).pipe(
            shareReplay(),
            finalize(() => this.uiService.loading.next(false)),
            catchError((error: HttpErrorResponse) => {
                // if form is gone - redirect and get new form
                console.error(error)
                return EMPTY;
            })
        );
    }

    public GetVerificationForm(flow: string | null = null): Observable<ApiResponse<VerificationFlow>> {
        let params = new HttpParams();
        if (flow) params = params.append("flow", flow);
        this.uiService.loading.next(true)
        return this.http.get<ApiResponse<VerificationFlow>>("/api/auth/verification", { params: params, withCredentials: true }).pipe(
            shareReplay(),
            finalize(() => this.uiService.loading.next(false)),
            catchError((error: HttpErrorResponse) => {
                // if form is gone - redirect and get new form
                console.error(error)
                return EMPTY;
            })
        );
    }

    public GetRecoveryForm(flow: string | null = null): Observable<ApiResponse<RecoveryFlow>> {
        let params = new HttpParams();
        if (flow) params = params.append("flow", flow);
        this.uiService.loading.next(true)
        return this.http.get<ApiResponse<RecoveryFlow>>("/api/auth/recovery", { params: params, withCredentials: true }).pipe(
            shareReplay(),
            finalize(() => this.uiService.loading.next(false)),
            catchError((error: HttpErrorResponse) => {
                // if form is gone - redirect and get new form
                console.error(error)
                return EMPTY;
            })
        );
    }

    public GetError(flow: string): Observable<ApiResponse<FlowError>> {
        let params = new HttpParams();
        params = params.append("id", flow);
        this.uiService.loading.next(true)
        return this.http.get<ApiResponse<FlowError>>("/api/auth/error", { params: params, withCredentials: true }).pipe(
            shareReplay(),
            finalize(() => this.uiService.loading.next(false)),
            catchError((error: HttpErrorResponse) => {
                // if form is gone - redirect and get new form
                console.error(error)
                return EMPTY;
            })
        );
    }
}
