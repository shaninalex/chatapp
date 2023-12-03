import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient } from '@angular/common/http';
import { identityReducer } from './store/identity/reducer';
import { IdentityEffects } from './store/identity/effects';
import { MessagesService } from './shared/services/messages.service';


export const appConfig: ApplicationConfig = {
    providers: [
        provideHttpClient(),
        MessagesService,
        provideRouter(routes),
        provideStore({
            identity: identityReducer
        }, {}),
        provideEffects([
            IdentityEffects,
        ]),
    ]
};
