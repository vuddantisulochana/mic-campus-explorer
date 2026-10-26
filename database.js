const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');
const seedData = require('./seedData');

const dbPath = path.resolve(__dirname, 'campus.db');
const db = new sqlite3.Database(dbPath);

function initDatabase(forceReseed = true) {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // 1. Buildings Table
      db.run(`CREATE TABLE IF NOT EXISTS buildings (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        code TEXT NOT NULL,
        type TEXT NOT NULL,
        floors_count INTEGER NOT NULL,
        description TEXT,
        icon TEXT,
        category TEXT,
        color TEXT,
        svg_shape TEXT
      )`);

      // 2. Floors Table
      db.run(`CREATE TABLE IF NOT EXISTS floors (
        id TEXT PRIMARY KEY,
        building_id TEXT NOT NULL,
        floor_number INTEGER NOT NULL,
        floor_name TEXT NOT NULL,
        description TEXT,
        verified_directory TEXT,
        FOREIGN KEY (building_id) REFERENCES buildings(id)
      )`);

      // 3. Departments Table
      db.run(`CREATE TABLE IF NOT EXISTS departments (
        id TEXT PRIMARY KEY,
        building_id TEXT NOT NULL,
        floor_id TEXT,
        name TEXT NOT NULL,
        code TEXT NOT NULL,
        hod TEXT,
        description TEXT,
        icon TEXT,
        FOREIGN KEY (building_id) REFERENCES buildings(id),
        FOREIGN KEY (floor_id) REFERENCES floors(id)
      )`);

      // 4. Rooms Table
      db.run(`CREATE TABLE IF NOT EXISTS rooms (
        id TEXT PRIMARY KEY,
        room_number TEXT NOT NULL,
        name TEXT NOT NULL,
        building_id TEXT NOT NULL,
        floor_id TEXT NOT NULL,
        department_id TEXT,
        type TEXT,
        description TEXT,
        FOREIGN KEY (building_id) REFERENCES buildings(id),
        FOREIGN KEY (floor_id) REFERENCES floors(id),
        FOREIGN KEY (department_id) REFERENCES departments(id)
      )`);

      // 5. Facilities Table
      db.run(`CREATE TABLE IF NOT EXISTS facilities (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        building_id TEXT,
        floor_id TEXT,
        location_desc TEXT,
        icon TEXT,
        description TEXT,
        FOREIGN KEY (building_id) REFERENCES buildings(id)
      )`);

      // 6. Navigation Nodes Table
      db.run(`CREATE TABLE IF NOT EXISTS nav_nodes (
        id TEXT PRIMARY KEY,
        label TEXT NOT NULL,
        building_id TEXT,
        floor_id TEXT,
        x REAL NOT NULL,
        y REAL NOT NULL,
        type TEXT,
        qr_code TEXT
      )`);

      // 7. Navigation Edges Table
      db.run(`CREATE TABLE IF NOT EXISTS nav_edges (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        from_node TEXT NOT NULL,
        to_node TEXT NOT NULL,
        distance REAL NOT NULL,
        hint TEXT,
        FOREIGN KEY (from_node) REFERENCES nav_nodes(id),
        FOREIGN KEY (to_node) REFERENCES nav_nodes(id)
      )`);

      // 8. QR Locations Table
      db.run(`CREATE TABLE IF NOT EXISTS qr_locations (
        qr_code TEXT PRIMARY KEY,
        location_name TEXT NOT NULL,
        building_id TEXT,
        floor_id TEXT,
        node_id TEXT NOT NULL,
        description TEXT,
        status TEXT DEFAULT 'active',
        FOREIGN KEY (building_id) REFERENCES buildings(id),
        FOREIGN KEY (node_id) REFERENCES nav_nodes(id)
      )`);

      // 9. Announcements Table
      db.run(`CREATE TABLE IF NOT EXISTS announcements (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        category TEXT NOT NULL,
        date TEXT NOT NULL,
        content TEXT NOT NULL,
        priority TEXT DEFAULT 'normal',
        active INTEGER DEFAULT 1
      )`);

      // 10. Contacts Table
      db.run(`CREATE TABLE IF NOT EXISTS contacts (
        id TEXT PRIMARY KEY,
        department TEXT NOT NULL,
        role TEXT NOT NULL,
        name TEXT NOT NULL,
        phone TEXT NOT NULL,
        email TEXT NOT NULL,
        location TEXT NOT NULL
      )`);

      console.log('[Database] Seeding verified campus database and navigation routes...');

      // Clear old navigation edges & nodes to ensure exact new graph
      db.run('DELETE FROM nav_edges');
      db.run('DELETE FROM nav_nodes');
      db.run('DELETE FROM qr_locations');

      const stmtBldg = db.prepare(`INSERT OR REPLACE INTO buildings VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
      seedData.buildings.forEach(b => {
        stmtBldg.run(b.id, b.name, b.code, b.type, b.floors_count, b.description, b.icon, b.category, b.color, JSON.stringify(b.svg_shape));
      });
      stmtBldg.finalize();

      const stmtFloor = db.prepare(`INSERT OR REPLACE INTO floors VALUES (?, ?, ?, ?, ?, ?)`);
      seedData.floors.forEach(f => {
        stmtFloor.run(f.id, f.building_id, f.floor_number, f.floor_name, f.description, JSON.stringify(f.verified_directory));
      });
      stmtFloor.finalize();

      const stmtDept = db.prepare(`INSERT OR REPLACE INTO departments VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);
      seedData.departments.forEach(d => {
        stmtDept.run(d.id, d.building_id, d.floor_id, d.name, d.code, d.hod, d.description, d.icon);
      });
      stmtDept.finalize();

      const stmtRoom = db.prepare(`INSERT OR REPLACE INTO rooms VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);
      seedData.rooms.forEach(r => {
        stmtRoom.run(r.id, r.room_number, r.name, r.building_id, r.floor_id, r.department_id, r.type, r.description);
      });
      stmtRoom.finalize();

      const stmtFac = db.prepare(`INSERT OR REPLACE INTO facilities VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);
      seedData.facilities.forEach(f => {
        stmtFac.run(f.id, f.name, f.category, f.building_id, f.floor_id, f.location_desc, f.icon, f.description);
      });
      stmtFac.finalize();

      const stmtNode = db.prepare(`INSERT OR REPLACE INTO nav_nodes VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);
      seedData.nodes.forEach(n => {
        stmtNode.run(n.id, n.label, n.building_id, n.floor_id, n.x, n.y, n.type, n.qr_code);
      });
      stmtNode.finalize();

      const stmtEdge = db.prepare(`INSERT INTO nav_edges (from_node, to_node, distance, hint) VALUES (?, ?, ?, ?)`);
      seedData.edges.forEach(e => {
        stmtEdge.run(e.from, e.to, e.distance, e.hint);
        stmtEdge.run(e.to, e.from, e.distance, e.hint);
      });
      stmtEdge.finalize();

      const stmtQR = db.prepare(`INSERT OR REPLACE INTO qr_locations VALUES (?, ?, ?, ?, ?, ?, 'active')`);
      seedData.qrLocations.forEach(q => {
        stmtQR.run(q.qr_code, q.location_name, q.building_id, q.floor_id, q.node_id, q.description);
      });
      stmtQR.finalize();

      const stmtAnn = db.prepare(`INSERT OR REPLACE INTO announcements VALUES (?, ?, ?, ?, ?, ?, 1)`);
      seedData.announcements.forEach(a => {
        stmtAnn.run(a.id, a.title, a.category, a.date, a.content, a.priority);
      });
      stmtAnn.finalize();

      const stmtCont = db.prepare(`INSERT OR REPLACE INTO contacts VALUES (?, ?, ?, ?, ?, ?, ?)`);
      seedData.contacts.forEach(c => {
        stmtCont.run(c.id, c.department, c.role, c.name, c.phone, c.email, c.location);
      });
      stmtCont.finalize();

      console.log('[Database] Campus database successfully updated and verified!');
      resolve(db);
    });
  });
}

// Function to import user database records specifically for `rooms` and `contacts` tables
function importCustomDatabase(importedData) {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      let roomsImported = 0;
      let contactsImported = 0;

      if (importedData.rooms && Array.isArray(importedData.rooms)) {
        const stmtRoom = db.prepare(`
          INSERT OR REPLACE INTO rooms (id, room_number, name, building_id, floor_id, department_id, type, description)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `);
        importedData.rooms.forEach(r => {
          const id = r.id || `room-${r.room_number || Date.now()}`;
          stmtRoom.run(
            id,
            r.room_number || 'N/A',
            r.name || `Room ${r.room_number}`,
            r.building_id || 'bldg-macb',
            r.floor_id || 'floor-macb-gf',
            r.department_id || null,
            r.type || 'Room',
            r.description || ''
          );
          roomsImported++;
        });
        stmtRoom.finalize();
      }

      if (importedData.contacts && Array.isArray(importedData.contacts)) {
        const stmtCont = db.prepare(`
          INSERT OR REPLACE INTO contacts (id, department, role, name, phone, email, location)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `);
        importedData.contacts.forEach(c => {
          const id = c.id || `cont-${Date.now()}-${Math.floor(Math.random()*1000)}`;
          stmtCont.run(
            id,
            c.department || 'General',
            c.role || 'Officer',
            c.name || 'Staff',
            c.phone || '',
            c.email || '',
            c.location || 'MIC Campus'
          );
          contactsImported++;
        });
        stmtCont.finalize();
      }

      resolve({ success: true, roomsImported, contactsImported });
    });
  });
}

module.exports = {
  db,
  initDatabase,
  importCustomDatabase
};
