const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./server/campus.db');

const ids = [
  'room-1001','room-1002','room-1003','room-1004',
  'room-1005','room-1006','room-1007','room-1008',
  'room-2001','room-2002','room-2003'
];

const placeholders = ids.map(() => '?').join(',');

db.run(
  `DELETE FROM rooms WHERE id IN (${placeholders})`,
  ids,
  function (err) {
    if (err) throw err;

    console.log('Deleted stale rooms:', this.changes);

    db.get(
      'SELECT COUNT(*) AS total FROM rooms',
      (err, row) => {
        if (err) throw err;

        console.log('FINAL ROOM COUNT:', row.total);
        db.close();
      }
    );
  }
);
