const x = require('./database');

const rows = x.db.prepare(`
  SELECT id, label, floor_id
  FROM nav_nodes
  ORDER BY id
  LIMIT 30
`).all();

console.table(rows);
