const { db } = require('./database');

const ids = [7067, 7068, 7069, 7070];

db.run(
  `DELETE FROM nav_edges WHERE id IN (${ids.join(',')})`,
  function(err) {
    if (err) {
      console.error(err);
      return;
    }

    console.log(`Removed ${this.changes} Diploma → Main Block shortcut edges.`);
    db.close();
  }
);
