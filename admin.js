const express = require('express');
const router = express.Router();
const { db, importCustomDatabase } = require('../database');

const ADMIN_PASSCODE = 'mictech2026';

function verifyAdmin(req, res, next) {
  const authHeader = req.headers['x-admin-key'] || req.query.key;
  if (!authHeader || authHeader !== ADMIN_PASSCODE) {
    return res.status(401).json({ error: 'Unauthorized: Invalid Admin Key. Access denied.' });
  }
  next();
}

// POST endpoint to import user database specifically for `rooms` and `contacts` tables
router.post('/import-database', verifyAdmin, async (req, res) => {
  try {
    const { rooms, contacts } = req.body;
    if (!rooms && !contacts) {
      return res.status(400).json({ error: 'Please provide valid rooms or contacts data array to import.' });
    }

    const result = await importCustomDatabase({ rooms, contacts });
    res.json({
      success: true,
      message: `Database tables successfully synchronized: ${result.roomsImported} rooms, ${result.contactsImported} contacts updated!`,
      details: result
    });
  } catch (err) {
    res.status(500).json({ error: `Import failed: ${err.message}` });
  }
});

// POST new announcement
router.post('/announcements', verifyAdmin, (req, res) => {
  const { title, category, content, priority } = req.body;
  if (!title || !category || !content) {
    return res.status(400).json({ error: 'Title, category, and content are required.' });
  }

  const id = `ann-${Date.now()}`;
  const date = new Date().toISOString().split('T')[0];
  const prio = priority || 'normal';

  const stmt = db.prepare('INSERT INTO announcements (id, title, category, date, content, priority, active) VALUES (?, ?, ?, ?, ?, ?, 1)');
  stmt.run(id, title, category, date, content, prio, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ success: true, message: 'Announcement created successfully', id });
  });
});

// POST register/update QR Location
router.post('/qr', verifyAdmin, (req, res) => {
  const { qr_code, location_name, building_id, floor_id, node_id, description, status } = req.body;
  if (!qr_code || !location_name || !node_id) {
    return res.status(400).json({ error: 'QR Code, Location Name, and Node ID are required.' });
  }

  const stmt = db.prepare(`
    INSERT INTO qr_locations (qr_code, location_name, building_id, floor_id, node_id, description, status)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(qr_code) DO UPDATE SET
      location_name = excluded.location_name,
      building_id = excluded.building_id,
      floor_id = excluded.floor_id,
      node_id = excluded.node_id,
      description = excluded.description,
      status = excluded.status
  `);

  stmt.run(qr_code.toUpperCase(), location_name, building_id || null, floor_id || null, node_id, description || '', status || 'active', function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, message: `QR Code ${qr_code} updated successfully` });
  });
});

// POST add room
router.post('/rooms', verifyAdmin, (req, res) => {
  const { room_number, name, building_id, floor_id, department_id, type, description } = req.body;
  if (!room_number || !name || !building_id || !floor_id) {
    return res.status(400).json({ error: 'Room number, name, building, and floor are required.' });
  }

  const id = `room-${Date.now()}`;
  const stmt = db.prepare('INSERT INTO rooms (id, room_number, name, building_id, floor_id, department_id, type, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
  stmt.run(id, room_number, name, building_id, floor_id, department_id || null, type || 'Classroom', description || '', function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ success: true, message: 'Room created successfully', id });
  });
});

// Admin verify key check
router.post('/verify', verifyAdmin, (req, res) => {
  res.json({ success: true, authenticated: true });
});

module.exports = router;
