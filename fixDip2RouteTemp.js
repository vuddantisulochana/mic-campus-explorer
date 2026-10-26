const database = require('./server/database');
const db = database.db;

db.serialize(() => {

  // 1. Move Diploma Block-2 entrance to the actual road-facing bottom edge
  db.run(
    "UPDATE nav_nodes SET x = 300, y = 535 WHERE id = 'node-dip2-entrance'"
  );

  // 2. Add road-following nodes
  db.run(`
    INSERT OR REPLACE INTO nav_nodes
    (id, label, building_id, floor_id, x, y, type, qr_code)
    VALUES
    ('node-dip2-road-south', 'Diploma-2 South Road Junction', NULL, NULL, 260, 550, 'junction', NULL),
    ('node-dip2-road-front', 'Diploma-2 Front Road', NULL, NULL, 330, 550, 'path', NULL),
    ('node-dip2-entrance-link', 'Diploma-2 Entrance Road Link', NULL, NULL, 330, 535, 'path', NULL)
  `);

  // 3. Remove the old diagonal connection
  db.run(`
    DELETE FROM nav_edges
    WHERE
      (from_node = 'node-diploma-middle-road' AND to_node = 'node-dip2-entrance')
      OR
      (from_node = 'node-dip2-entrance' AND to_node = 'node-diploma-middle-road')
  `);

  // 4. Add edges following the visible road
  const edges = [
    ['node-west-road-bed', 'node-dip2-road-south', 180, 'Continue south on the west roadway toward Diploma Block-2'],
    ['node-dip2-road-south', 'node-west-road-bed', 180, 'Continue north on the west roadway toward BED & Diploma junction'],

    ['node-dip2-road-south', 'node-dip2-road-front', 70, 'Turn east onto the Diploma Block-2 front road'],
    ['node-dip2-road-front', 'node-dip2-road-south', 70, 'Turn west onto the west roadway'],

    ['node-dip2-road-front', 'node-dip2-entrance-link', 15, 'Continue toward Diploma Block-2 entrance'],
    ['node-dip2-entrance-link', 'node-dip2-road-front', 15, 'Return to Diploma Block-2 front road'],

    ['node-dip2-entrance-link', 'node-dip2-entrance', 30, 'Arrive at Diploma Block-2 Main Entrance'],
    ['node-dip2-entrance', 'node-dip2-entrance-link', 30, 'Leave Diploma Block-2 Main Entrance']
  ];

  const stmt = db.prepare(`
    INSERT INTO nav_edges (from_node, to_node, distance, hint)
    VALUES (?, ?, ?, ?)
  `);

  for (const e of edges) {
    stmt.run(e[0], e[1], e[2], e[3]);
  }

  stmt.finalize(() => {
    console.log('Diploma Block-2 road-following navigation updated successfully.');
    db.close();
  });
});
