import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html'
})
export class RegisterComponent {
    registerForm: FormGroup = new FormGroup({
        email: new FormControl("", [Validators.required, Validators.email]),
        password: new FormControl("", [Validators.required]),
    })

    constructor(private authService: AuthService) { }


    Submit() {
        if (this.registerForm.valid) {
            this.authService.register(this.registerForm.value);
        }
    }


}
