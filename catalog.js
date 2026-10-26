const express = require('express');
const router = express.Router();
const { db } = require('../database');

// GET all departments
router.get('/departments', (req, res) => {
  const query = `
    SELECT d.*, b.name as building_name, b.code as building_code, f.floor_name 
    FROM departments d
    LEFT JOIN buildings b ON d.building_id = b.id
    LEFT JOIN floors f ON d.floor_id = f.id
    ORDER BY d.name ASC
  `;
  db.all(query, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// GET all floors
router.get('/floors', (req, res) => {
  const buildingId = req.query.buildingId;
  let query = `
    SELECT f.*, b.name as building_name, b.code as building_code
    FROM floors f
    JOIN buildings b ON f.building_id = b.id
  `;
  const params = [];
  if (buildingId) {
    query += ` WHERE f.building_id = ?`;
    params.push(buildingId);
  }
  query += ` ORDER BY b.name ASC, f.floor_number ASC`;

  db.all(query, params, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    const floors = rows.map(r => {
      let verifiedDirectory = [];

      if (r.verified_directory) {
        try {
          verifiedDirectory = JSON.parse(r.verified_directory);

          if (!Array.isArray(verifiedDirectory)) {
            verifiedDirectory = [verifiedDirectory];
          }
        } catch (parseError) {
          console.warn(
            `[Catalog] Invalid verified_directory for floor ${r.id}. Using empty directory.`
          );

          verifiedDirectory = [];
        }
      }

      return {
        ...r,
        verified_directory: verifiedDirectory
      };
    });
    res.json(floors);
  });
});

// GET all rooms
router.get('/rooms', (req, res) => {
  const query = `
    SELECT r.*, b.name as building_name, f.floor_name, d.name as department_name
    FROM rooms r
    JOIN buildings b ON r.building_id = b.id
    JOIN floors f ON r.floor_id = f.id
    LEFT JOIN departments d ON r.department_id = d.id
    ORDER BY r.room_number ASC
  `;
  db.all(query, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// GET all facilities
router.get('/facilities', (req, res) => {
  const category = req.query.category;
  let query = `
    SELECT fc.*, b.name as building_name, f.floor_name
    FROM facilities fc
    LEFT JOIN buildings b ON fc.building_id = b.id
    LEFT JOIN floors f ON fc.floor_id = f.id
  `;
  const params = [];
  if (category && category !== 'all') {
    query += ` WHERE fc.category = ?`;
    params.push(category);
  }
  query += ` ORDER BY fc.name ASC`;

  db.all(query, params, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

module.exports = router;
