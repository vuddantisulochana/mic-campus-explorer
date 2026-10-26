const { db } = require('./database');

db.all(
  `SELECT id, from_node, to_node, distance, hint
   FROM nav_edges
   WHERE from_node LIKE '%canteen%'
      OR to_node LIKE '%canteen%'
      OR from_node LIKE '%south%'
      OR to_node LIKE '%south%'
      OR from_node IN ('node-main-junction','node-macb-entrance','node-macb-west-conn')
      OR to_node IN ('node-main-junction','node-macb-entrance','node-macb-west-conn')
   ORDER BY id`,
  (err, rows) => {
    if (err) {
      console.error(err);
      return;
    }

    console.table(rows);
    db.close();
  }
);
