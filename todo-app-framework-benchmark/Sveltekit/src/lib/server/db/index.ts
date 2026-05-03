import Database from 'better-sqlite3';
import { env } from '$env/dynamic/private';

const DB_PATH = env.DATABASE_URL ?? 'todos.db';

const db = new Database(DB_PATH);

db.exec(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    todo TEXT NOT NULL
  )
`);

export default db;
