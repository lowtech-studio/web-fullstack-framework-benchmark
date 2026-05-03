import { DatabaseSync } from 'node:sqlite';

// Dioxus-app
let db = new DatabaseSync('./Dioxus-app/todos.db');
db.exec(`
    DROP TABLE IF EXISTS todos;
    CREATE TABLE IF NOT EXISTS todos (
        id   INTEGER PRIMARY KEY AUTOINCREMENT,
        todo TEXT NOT NULL
    );
`);
for (let i = 1; i <= 10000; i++) {
  db.prepare('INSERT INTO todos (todo) VALUES (?)').run(`Todo ${i}`);
}
db.close();

// VanillaJS SSR
db = new DatabaseSync('./VanillaJS/SSR/todos.db');

db.exec(`
    DROP TABLE IF EXISTS todos;
    CREATE TABLE todos(
        todo TEXT
    );
`);

for (let i = 1; i <= 10000; i++) {
  const stmt = db.prepare('INSERT INTO todos (todo) VALUES (?)');
  stmt.run(`Todo ${i}`);
}

db.close();

db = new DatabaseSync('./VanillaJS/CSR/todos.db');

db.exec(`
    DROP TABLE IF EXISTS todos;
    CREATE TABLE todos(
        todo TEXT
    );
`);

for (let i = 1; i <= 10000; i++) {
  const stmt = db.prepare('INSERT INTO todos (todo) VALUES (?)');
  stmt.run(`Todo ${i}`);
}

db.close();