import { CanMatchFn, Route, UrlSegment } from "@angular/router";
import { inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../../store/store";
import { selectProfile } from "../../store/identity/selectors";
import { SetSessionStart } from "../../store/identity/actions";


export const AuthGuard: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
    for (let i = 0; i < segments.length; i++) {
        if (segments[i].path === 'auth') {
            return true
        }
    }

    const store = inject(Store<AppState>);
    store.select(selectProfile).subscribe({
        next: data => {
            if (!data) {
                store.dispatch(SetSessionStart())
            }

            const expDate = new Date(data?.session?.expires_at as string);
            const currentDate = new Date();

            // we need to check "expires_at" and "active" fields in session
            // before moving on. If it outdated - renew session
            if (!data?.session?.active || expDate < currentDate) {
                store.dispatch(SetSessionStart())
            }
        },
        error: (err) => {
            console.error(err)
        }
    })

    return true;
};
