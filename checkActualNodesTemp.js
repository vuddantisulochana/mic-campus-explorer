const { db } = require('./database');

db.all(`
  SELECT id, label, floor_id
  FROM nav_nodes
  ORDER BY label ASC
`, (err, rows) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("TOTAL NODES:", rows.length);
  console.table(rows);
});
