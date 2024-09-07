import { Component } from "@angular/core";

@Component({
    selector: "app-auth",
    template: `
<div class="flex h-screen items-center justify-center">
    <div class="min-h-[18rem] w-[24rem]">
        <router-outlet />
    </div>
</div>`
})
export class AuthComponent { }


