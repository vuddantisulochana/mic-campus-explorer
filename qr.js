const express = require('express');
const router = express.Router();
const { db } = require('../database');

// GET all QR locations
router.get('/locations', (req, res) => {
  const query = `
    SELECT q.*, b.name as building_name, f.floor_name, n.x, n.y
    FROM qr_locations q
    LEFT JOIN buildings b ON q.building_id = b.id
    LEFT JOIN floors f ON q.floor_id = f.id
    LEFT JOIN nav_nodes n ON q.node_id = n.id
    WHERE q.status = 'active'
    ORDER BY q.location_name ASC
  `;
  db.all(query, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// GET specific QR location by token code (e.g. MICLOC-MACB-GF)
router.get('/:code', (req, res) => {
  const qrCode = req.params.code.trim().toUpperCase();
  const query = `
    SELECT q.*, b.name as building_name, b.code as building_code, 
           f.floor_name, f.floor_number, n.x, n.y, n.type as node_type
    FROM qr_locations q
    LEFT JOIN buildings b ON q.building_id = b.id
    LEFT JOIN floors f ON q.floor_id = f.id
    LEFT JOIN nav_nodes n ON q.node_id = n.id
    WHERE upper(q.qr_code) = ?
  `;
  db.get(query, [qrCode], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) {
      return res.status(404).json({
        found: false,
        error: `Unrecognized Campus QR code: "${qrCode}". Please scan an official MIC Campus QR code.`
      });
    }

    res.json({
      found: true,
      qr_code: row.qr_code,
      location_name: row.location_name,
      building_id: row.building_id,
      building_name: row.building_name,
      building_code: row.building_code,
      floor_id: row.floor_id,
      floor_name: row.floor_name,
      floor_number: row.floor_number,
      node_id: row.node_id,
      coordinates: { x: row.x, y: row.y },
      description: row.description
    });
  });
});

module.exports = router;
