import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: "app-send-form",
    template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()"
        class="border px-5 py-4 flex items-center gap-4 m-4 rounded-xl"
    >
        <div class="flex items-center gap-4 text-slate-300">
            <button type="button" disabled><i class="fa-solid fa-microphone"></i></button>
            <button type="button" disabled><i class="fa-regular fa-image"></i></button>
            <button type="button" disabled><i class="fa-regular fa-face-smile"></i></button>
        </div>
        <div class="flex-grow">
            <div class="w-full">
                <input type="text" class="w-full" placeholder="Type message" formControlName="body" />
            </div>
        </div>
        <div>
            <button type="submit" [disabled]="!form.valid" class="hover:text-green-600 text-xl text-slate-600 disabled:opacity-75">
                <i class="fa-regular fa-paper-plane"></i>
            </button>
        </div>
    </form>
    `
})
export class SendFromComponent {
    form: FormGroup;

    constructor() {
        this.form = new FormGroup({
            body: new FormControl<string>("", Validators.required),
        })
    }

    onSubmit(): void {
        if (!this.form.valid) {
            return
        }
        this.form.reset();
    }
}
