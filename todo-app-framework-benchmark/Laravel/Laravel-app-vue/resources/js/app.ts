import { createInertiaApp } from '@inertiajs/vue3';

createInertiaApp({
    title: (title) => title ?? 'ToDo App',
    layout: () => null,
    progress: {
        color: '#4B5563',
    },
});
