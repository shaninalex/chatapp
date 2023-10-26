import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const UIActions = createActionGroup({
    source: 'UI',
    events: {
        'Toggle User Info': emptyProps(),
        'Toggle Contacts Compact View': emptyProps(),
    },
});
