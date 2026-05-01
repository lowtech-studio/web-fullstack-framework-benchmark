import { DatabaseSync } from 'node:sqlite'

let db: DatabaseSync | null = null

export function useDatabase(): DatabaseSync {
  if (!db) {
    // Le chemin absolu est injecté via runtimeConfig depuis nuxt.config.ts
    // Il peut être surchargé via la variable d'env NUXT_DATABASE_PATH
    const config = useRuntimeConfig()
    const dbPath = config.databasePath as string
    db = new DatabaseSync(dbPath)
    db.exec(`
      CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        todo TEXT NOT NULL
      )
    `)
  }
  return db
}