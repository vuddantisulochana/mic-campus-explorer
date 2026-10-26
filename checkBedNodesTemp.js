const x = require('./database');

const sql = `
SELECT id, label, floor_id, x, y
FROM nav_nodes
WHERE id IN (
  'node-main-junction',
  'node-macb-entrance',
  'node-west-road-bed',
  'node-bed'
)
ORDER BY id;
`;

console.table(x.db.prepare(sql).all());
