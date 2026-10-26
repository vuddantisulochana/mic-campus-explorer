const { db } = require('./database');

const sql = `
SELECT id, from_node, to_node, distance
FROM nav_edges
WHERE from_node IN (
  'node-gate',
  'node-main-junction',
  'node-macb-entrance',
  'node-west-road-bed',
  'node-bed'
)
OR to_node IN (
  'node-gate',
  'node-main-junction',
  'node-macb-entrance',
  'node-west-road-bed',
  'node-bed'
)
ORDER BY from_node, to_node;
`;

db.all(sql, (err, rows) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("BED ROUTE RELATED EDGES:", rows.length);
  console.table(rows);
});
