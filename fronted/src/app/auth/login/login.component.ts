import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    loginForm: FormGroup = new FormGroup({
        email: new FormControl("", [Validators.required, Validators.email]),
        password: new FormControl("", [Validators.required]),
    })

    constructor(private http: HttpClient) { }

    Submit() {
        if (this.loginForm.valid) {
            this.http.post('/api/v1/auth/login', this.loginForm.value).subscribe({
                next: data => {
                    console.log(data);
                }
            })
        }
    }


}
