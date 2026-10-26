const { db } = require('./database');

db.all(`
SELECT id, name, code, type, svg_shape
FROM buildings
WHERE id IN ('bldg-macb','bldg-dip1','bldg-dip2','bldg-bed')
`, (e, r) => {
  if (e) console.error(e);
  else console.table(r);
  db.close();
});
