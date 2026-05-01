declare module '@inertiajs/core' {
    export interface InertiaConfig {
        sharedPageProps: {
            [key: string]: unknown;
        };
    }
}
