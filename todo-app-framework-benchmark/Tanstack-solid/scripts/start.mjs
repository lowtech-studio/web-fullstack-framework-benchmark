import { serve } from 'srvx/node'
import { serveStatic } from 'srvx/static'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

const staticDir = resolve(root, 'dist/client')
const { default: serverHandler } = await import(resolve(root, 'dist/server/server.js'))

const server = serve({
  port: Number(process.env.PORT ?? 3000),
  fetch: serverHandler.fetch,
  middleware: [
    serveStatic({ dir: staticDir }),
  ],
})

await server.ready()
console.log(`➜ Server running on http://localhost:${server.options.port}/`)

// Keep the process alive
process.on('SIGINT', () => { server.close(); process.exit(0) })
process.on('SIGTERM', () => { server.close(); process.exit(0) })
await new Promise(() => {})
