const database = require('./server/database');
const db = database.db;

db.get(
  "SELECT id, name, svg_shape FROM buildings WHERE id IN ('bldg-dip1','bldg-dip2')",
  [],
  (err, row) => {
    if (err) console.error(err);
    else console.log(row);
    db.close();
  }
);
