const { db } = require('./database');

const ids = [7007, 7008, 7009, 7010];

db.run(
  `DELETE FROM nav_edges WHERE id IN (${ids.join(',')})`,
  function(err) {
    if (err) {
      console.error(err);
      return;
    }

    console.log(`Removed ${this.changes} incorrect West Road → Main Block shortcut edges.`);
    db.close();
  }
);
