const database = require('./server/database');
const db = database.db;

db.all(
  "SELECT id,label,x,y,type,building_id FROM nav_nodes WHERE id IN ('node-west-road-bed','node-diploma-middle-road','node-dip2-entrance')",
  (err, rows) => {
    if (err) throw err;
    console.table(rows);
    db.close();
  }
);
