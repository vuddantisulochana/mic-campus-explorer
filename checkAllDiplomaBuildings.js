const database = require('./server/database');
const db = database.db;

db.all(
  "SELECT id, name, code, svg_shape FROM buildings WHERE name LIKE '%Diploma%' OR id LIKE '%dip%'",
  [],
  (err, rows) => {
    if (err) console.error(err);
    else console.table(rows);
    db.close();
  }
);
