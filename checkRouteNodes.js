const { db } = require('./database');

const sql = `
SELECT id, label, x, y, building_id, floor_id
FROM nav_nodes
WHERE id LIKE '%diploma%'
   OR id LIKE '%dip%'
   OR id LIKE '%macb%'
   OR id LIKE '%canteen%'
   OR id LIKE '%west-road%'
   OR id LIKE '%south-road%'
`;

db.all(sql, (e, r) => {
  if (e) {
    console.error(e);
  } else {
    console.table(r);
  }
  db.close();
});
