const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./server/campus.db');

const sql = `
SELECT
  f.floor_name AS floor,
  r.room_number AS room,
  r.name AS name
FROM rooms r
JOIN buildings b ON r.building_id = b.id
JOIN floors f ON r.floor_id = f.id
WHERE b.id = 'bldg-macb'
ORDER BY f.id, CAST(r.room_number AS INTEGER)
`;

db.all(sql, (err, rows) => {
  if (err) throw err;
  console.table(rows);
  db.close();
});
