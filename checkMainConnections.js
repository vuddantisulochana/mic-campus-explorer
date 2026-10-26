const { db } = require('./database');

db.all(`
SELECT id, from_node, to_node, distance, hint
FROM nav_edges
WHERE from_node IN (
  'node-west-road-labs',
  'node-west-road-south',
  'node-west-road-bed',
  'node-main-playground-road-bottom',
  'node-main-playground-road',
  'node-main-junction',
  'node-macb-entrance'
)
OR to_node IN (
  'node-west-road-labs',
  'node-west-road-south',
  'node-west-road-bed',
  'node-main-playground-road-bottom',
  'node-main-playground-road',
  'node-main-junction',
  'node-macb-entrance'
)
ORDER BY id
`, (e, r) => {
  if (e) console.error(e);
  else console.table(r);
  db.close();
});
