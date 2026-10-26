const { db } = require('./database');

db.all(`PRAGMA table_info(buildings)`, (e, r) => {
  if (e) console.error(e);
  else console.table(r);
  db.close();
});
