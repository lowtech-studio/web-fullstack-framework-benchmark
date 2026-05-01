import { createInertiaApp } from '@inertiajs/react';

createInertiaApp({
    title: (title) => title ?? 'ToDo App',
    layout: () => null,
    strictMode: true,
    progress: {
        color: '#4B5563',
    },
});
