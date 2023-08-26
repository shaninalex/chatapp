import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    registerForm: FormGroup = new FormGroup({
        email: new FormControl("", [Validators.required, Validators.email]),
        password: new FormControl("", [Validators.required]),
    })

    constructor(private http: HttpClient) { }

    Submit() {
        if (this.registerForm.valid) {
            this.http.post('/api/v1/auth', this.registerForm.value).subscribe({
                next: data => {
                    console.log(data);
                }
            })
        }
    }


}
