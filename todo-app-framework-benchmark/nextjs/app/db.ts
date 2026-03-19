import { DatabaseSync } from 'node:sqlite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, '../todos.db');

const db = new DatabaseSync(dbPath);

export type Todo = { todo: string };

export function getTodos(): Todo[] {
  return db.prepare('SELECT todo FROM todos').all() as Todo[];
}

export function createTodo(todo: string) {
  db.prepare('INSERT INTO todos (todo) VALUES (?)').run(todo);
}

export function deleteTodo(todo: string) {
  db.prepare('DELETE FROM todos WHERE todo = ?').run(todo);
}
