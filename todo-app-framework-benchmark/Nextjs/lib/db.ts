import Database from 'better-sqlite3';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'todos.db');

let db: Database.Database;

function getDb(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    db.exec(`
      CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        todo TEXT NOT NULL
      )
    `);
  }
  return db;
}

export type Todo = {
  id: number;
  todo: string;
};

export function getAllTodos(): Todo[] {
  return getDb().prepare('SELECT id, todo FROM todos ORDER BY id').all() as Todo[];
}

export function createTodo(todo: string): Todo {
  const stmt = getDb().prepare('INSERT INTO todos (todo) VALUES (?)');
  const result = stmt.run(todo);
  return { id: result.lastInsertRowid as number, todo };
}

export function deleteTodo(id: number): void {
  getDb().prepare('DELETE FROM todos WHERE id = ?').run(id);
}
