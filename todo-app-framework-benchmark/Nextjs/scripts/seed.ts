import Database from 'better-sqlite3';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'todos.db');

const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    todo TEXT NOT NULL
  )
`);

// Clear existing todos
db.exec('DELETE FROM todos');

// Insert 10000 todos in a single transaction for performance
const insert = db.prepare('INSERT INTO todos (todo) VALUES (?)');
const insertMany = db.transaction((todos: string[]) => {
  for (const todo of todos) {
    insert.run(todo);
  }
});

const todos = Array.from({ length: 10000 }, (_, i) => `Todo item ${i + 1}`);
insertMany(todos);

console.log('Seeded 10000 todos successfully.');
db.close();
