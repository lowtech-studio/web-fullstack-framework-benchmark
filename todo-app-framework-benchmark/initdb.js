import { DatabaseSync } from 'node:sqlite';
let db = new DatabaseSync('./VanillaJS/SSR/todos.db');

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

db = new DatabaseSync('./nextjs/todos.db');

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

db = new DatabaseSync('./django/todos.db');

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