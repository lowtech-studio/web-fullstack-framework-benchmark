import { Meteor } from 'meteor/meteor';
import { getDb } from '../../db.js';

Meteor.startup(() => {
  const db = getDb();
  const count = db.prepare('SELECT COUNT(*) as count FROM todos').get();
  if (count.count === 0) {
    console.log('Seeding database with 10000 todos...');
    db.exec('BEGIN TRANSACTION');
    const insert = db.prepare('INSERT INTO todos (todo) VALUES (?)');
    for (let i = 1; i <= 10000; i++) {
      insert.run(`Todo ${i}`);
    }
    db.exec('COMMIT');
    console.log('Done seeding 10000 todos.');
  }
});
