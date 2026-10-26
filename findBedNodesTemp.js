const x = require('./database');

const sql = `
SELECT id, label, floor_id, x, y
FROM nav_nodes
WHERE lower(id) LIKE '%bed%'
   OR lower(label) LIKE '%bed%'
   OR lower(label) LIKE '%diploma%'
   OR lower(label) LIKE '%west%'
ORDER BY id;
`;

console.table(x.db.prepare(sql).all());
