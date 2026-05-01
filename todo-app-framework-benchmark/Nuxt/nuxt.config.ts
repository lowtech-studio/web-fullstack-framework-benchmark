// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // Nuxt 4 future compatibility flags
  future: {
    compatibilityVersion: 4,
  },

  runtimeConfig: {
    // Chemin absolu vers la base SQLite.
    // Peut être surchargé via la variable d'environnement NUXT_DATABASE_PATH
    databasePath: new URL('todos.db', import.meta.url).pathname,
  },

  nitro: {
    node: true,
  },
})
