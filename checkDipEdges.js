const { db } = require('./database');

db.all(
  `SELECT id, from_node, to_node, distance, hint
   FROM nav_edges
   WHERE from_node IN (
     'node-west-road-bed',
     'node-dip-conn',
     'node-west-road-dip2',
     'node-dip2-entrance',
     'node-diploma-middle-road',
     'node-diploma-east-road',
     'node-macb-west-conn'
   )
   OR to_node IN (
     'node-west-road-bed',
     'node-dip-conn',
     'node-west-road-dip2',
     'node-dip2-entrance',
     'node-diploma-middle-road',
     'node-diploma-east-road',
     'node-macb-west-conn'
   )
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
