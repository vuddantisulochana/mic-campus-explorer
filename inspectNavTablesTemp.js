const x = require('./database');

const tables = x.db.prepare(`
  SELECT name
  FROM sqlite_master
  WHERE type = 'table'
  AND name LIKE '%nav%'
  ORDER BY name
`).all();

console.log("NAVIGATION TABLES:");
console.table(tables);
