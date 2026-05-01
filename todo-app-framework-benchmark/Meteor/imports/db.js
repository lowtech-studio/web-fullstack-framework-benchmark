// node:sqlite est un module natif Node — on utilise require() pour contourner
// le bundler Meteor qui ne sait pas le résoudre statiquement.
const { DatabaseSync } = require('node:sqlite');
const path = require('path');

const DB_PATH = path.join(process.cwd(), 'todos.db');

let _db = null;

export function getDb() {
  if (!_db) {
    _db = new DatabaseSync(DB_PATH);
    _db.exec(`
      CREATE TABLE IF NOT EXISTS todos (
        todo TEXT NOT NULL
      )
    `);
  }
  return _db;
}
