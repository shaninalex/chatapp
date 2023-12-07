import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient } from '@angular/common/http';
import { identityReducer } from './store/identity/reducer';
import { IdentityEffects } from './store/identity/effects';
import { MessagesService } from './shared/services/messages.service';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { AppState } from './store';


export const appConfig: ApplicationConfig = {
    providers: [
    provideHttpClient(),
    MessagesService,
    provideRouter(routes),
    provideStore(AppState, {}),
    provideEffects([
        IdentityEffects,
    ]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
]
};
