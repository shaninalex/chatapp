import { Component, OnInit } from "@angular/core";
import { AuthService } from "./auth.service";
import { ActivatedRoute } from "@angular/router";
import { FormBuilder } from "@angular/forms";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
    selector: "app-auth-error",
    template: `
@if (error; as err) {
    <div class="alert alert-danger" role="alert">
        <h4 class="alert-heading">{{ err.error.status }} ( {{err.error.code}} )</h4>
        <p *ngIf="err.error.reason">{{ err.error.reason }}</p>
        <p>{{ err.error.message }}</p>
        <hr>
        Details:
        <div class="small"><b>Docs:</b> {{ err.error.details.docs }}</div>
        <div class="small"><b>Hint:</b> {{ err.error.details.hint }}</div>
        <div class="small"><b>Reject reason:</b> {{ err.error.details.reject_reason }}</div>
    </div>
}
`
})
export class ErrorComponent implements OnInit {

    // TODO: define error details type (go code: github.com/ory/kratos-client-go@v1.1.0/model_flow_error.go)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error?: any;

    constructor(
        private authService: AuthService,
        private route: ActivatedRoute,
        public fb: FormBuilder,
    ) { }

    ngOnInit(): void {
        this.route.queryParams.subscribe({
            next: params => {
                this.authService.GetError(params["id"]).subscribe({
                    next: resp => {
                        this.error = resp.data;
                    },
                    error: (error: HttpErrorResponse) => {
                        console.error(error.status);
                    }
                });

            }
        });
    }
}
