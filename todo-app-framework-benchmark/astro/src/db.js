import Database from 'better-sqlite3';
import { join } from 'path';

const db = new Database(join(process.cwd(), 'todos.db'));

export function getTodos() {
  return db.prepare('SELECT todo FROM todos').all();
}

export function createTodo(todo) {
  const insert = db.prepare('INSERT INTO todos (todo) VALUES (?)');
  insert.run(todo);
}

export function deleteTodo(todo) {
  const deleteQuery = db.prepare('DELETE FROM todos WHERE todo = ?');
  deleteQuery.run(todo);
}
