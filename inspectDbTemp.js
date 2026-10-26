const x = require('./database');

console.log("EXPORT KEYS:", Object.keys(x));
console.log("DB TYPE:", typeof x.db);
console.log("DB KEYS:", x.db ? Object.keys(x.db) : "NO DB");
console.log("DB VALUE:", x.db);
