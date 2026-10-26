const { db } = require('./database');

db.all("PRAGMA table_info(nav_edges)", (err, rows) => {
  if (err) {
    console.error(err);
    return;
  }

  console.table(rows);
  db.close();
});
