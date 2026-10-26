const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./server/campus.db');

const sql = `
SELECT
  b.name AS building,
  f.floor_name AS floor,
  COUNT(r.id) AS rooms
FROM rooms r
JOIN buildings b ON r.building_id = b.id
JOIN floors f ON r.floor_id = f.id
GROUP BY b.name, f.id
ORDER BY b.name, f.id
`;

db.all(sql, (err, rows) => {
  if (err) throw err;

  console.table(rows);
  db.close();
});
