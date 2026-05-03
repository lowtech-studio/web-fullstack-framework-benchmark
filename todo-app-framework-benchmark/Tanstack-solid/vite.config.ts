import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/solid-start/plugin/vite'
import solidPlugin from 'vite-plugin-solid'

export default defineConfig({
  server: {
    port: 3000,
  },
  resolve: { tsconfigPaths: true },
  plugins: [
    tanstackStart(),
    solidPlugin({ ssr: true }),
  ],
})
