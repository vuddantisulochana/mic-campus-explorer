const { db } = require('./database');

db.all(`
SELECT id, label, x, y
FROM nav_nodes
WHERE id LIKE '%north%'
   OR id LIKE '%central%'
   OR id LIKE '%main%'
   OR id LIKE '%macb%'
   OR id LIKE '%parking%'
ORDER BY y, x
`, (e, r) => {
  if (e) console.error(e);
  else console.table(r);
  db.close();
});
