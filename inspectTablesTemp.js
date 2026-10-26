const x = require('./database');

const tables = x.db.prepare(`
  SELECT name
  FROM sqlite_master
  WHERE type = 'table'
  ORDER BY name
`).all();

console.log("TABLES:");
console.table(tables);
