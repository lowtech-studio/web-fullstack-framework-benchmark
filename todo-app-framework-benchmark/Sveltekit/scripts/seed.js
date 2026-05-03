import Database from 'better-sqlite3';

const db = new Database('todos.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    todo TEXT NOT NULL
  )
`);

const count = db.prepare('SELECT COUNT(*) as count FROM todos').get();
if (count.count > 0) {
  console.log(`Database already has ${count.count} todos. Skipping seed.`);
  db.close();
  process.exit(0);
}

const insert = db.prepare('INSERT INTO todos (todo) VALUES (?)');
const insertMany = db.transaction((todos) => {
  for (const todo of todos) {
    insert.run(todo);
  }
});

const todos = Array.from({ length: 10000 }, (_, i) => `Todo ${i + 1}`);
insertMany(todos);

console.log('Database seeded with 10000 todos.');
db.close();
