import { createInertiaApp } from '@inertiajs/svelte';

createInertiaApp({
    title: (title) => title ?? 'ToDo App',
    layout: () => null,
    progress: {
        color: '#4B5563',
    },
});
