import { createActionGroup, emptyProps, props } from '@ngrx/store';


export const ProfileActions = createActionGroup({
    source: 'Profile',
    events: {
        'Get User Start': emptyProps(),
        'Get User Success': props<{user: any}>(),
        'Get User Error': props<{error: string}>(),
    },
});
