const express = require('express');
const router = express.Router();
const { db } = require('../database');

// Smart Campus Search with multi-table queries and relevance scoring
router.get('/', (req, res) => {
  const queryText = (req.query.q || '').trim();
  const categoryFilter = req.query.category || 'all';

  if (!queryText && categoryFilter === 'all') {
    return res.json({ results: [], total: 0 });
  }

  const searchTerm = `%${queryText.toLowerCase()}%`;
  const results = [];

  // Helper promise-based queries
  const searchBuildings = new Promise((resolve) => {
    if (categoryFilter !== 'all' && categoryFilter !== 'academic' && categoryFilter !== 'building') {
      return resolve([]);
    }
    const sql = `
      SELECT id, name, code, type, description, icon, category, 'building' as entity_type,
             (CASE 
               WHEN lower(name) = lower(?) THEN 100
               WHEN lower(code) = lower(?) THEN 95
               WHEN lower(name) LIKE ? THEN 80
               ELSE 60 END) as score
      FROM buildings
      WHERE lower(name) LIKE ? OR lower(code) LIKE ? OR lower(description) LIKE ?
      ORDER BY score DESC LIMIT 5
    `;
    db.all(sql, [queryText, queryText, searchTerm, searchTerm, searchTerm, searchTerm], (err, rows) => {
      resolve(err ? [] : rows || []);
    });
  });

  const searchDepartments = new Promise((resolve) => {
    if (categoryFilter !== 'all' && categoryFilter !== 'academic' && categoryFilter !== 'department') {
      return resolve([]);
    }
    const sql = `
      SELECT d.id, d.name, d.code, d.hod, d.description, d.icon, 'department' as entity_type,
             b.name as building_name, b.id as building_id, f.floor_name, f.id as floor_id,
             (CASE 
               WHEN lower(d.name) = lower(?) THEN 100
               WHEN lower(d.code) = lower(?) THEN 95
               WHEN lower(d.name) LIKE ? THEN 85
               ELSE 65 END) as score
      FROM departments d
      LEFT JOIN buildings b ON d.building_id = b.id
      LEFT JOIN floors f ON d.floor_id = f.id
      WHERE lower(d.name) LIKE ? OR lower(d.code) LIKE ? OR lower(d.description) LIKE ?
      ORDER BY score DESC LIMIT 8
    `;
    db.all(sql, [queryText, queryText, searchTerm, searchTerm, searchTerm, searchTerm], (err, rows) => {
      resolve(err ? [] : rows || []);
    });
  });

  const searchRooms = new Promise((resolve) => {
    if (categoryFilter !== 'all' && categoryFilter !== 'room' && categoryFilter !== 'academic') {
      return resolve([]);
    }
    const sql = `
      SELECT r.id, r.room_number, r.name, r.type, r.description, 'room' as entity_type,
             b.name as building_name, b.id as building_id, f.floor_name, f.id as floor_id,
             d.name as department_name,
             (CASE 
               WHEN lower(r.room_number) = lower(?) THEN 100
               WHEN lower(r.name) LIKE ? THEN 80
               ELSE 60 END) as score
      FROM rooms r
      JOIN buildings b ON r.building_id = b.id
      JOIN floors f ON r.floor_id = f.id
      LEFT JOIN departments d ON r.department_id = d.id
      WHERE lower(r.room_number) LIKE ? OR lower(r.name) LIKE ? OR lower(r.description) LIKE ?
      ORDER BY score DESC LIMIT 8
    `;
    db.all(sql, [queryText, searchTerm, searchTerm, searchTerm, searchTerm], (err, rows) => {
      resolve(err ? [] : rows || []);
    });
  });

  const searchFacilities = new Promise((resolve) => {
    if (categoryFilter !== 'all' && categoryFilter !== 'facility' && categoryFilter !== 'amenity') {
      return resolve([]);
    }
    const sql = `
      SELECT fc.id, fc.name, fc.category, fc.location_desc, fc.icon, fc.description, 'facility' as entity_type,
             b.name as building_name, b.id as building_id,
             (CASE 
               WHEN lower(fc.name) = lower(?) THEN 100
               WHEN lower(fc.name) LIKE ? THEN 80
               ELSE 60 END) as score
      FROM facilities fc
      LEFT JOIN buildings b ON fc.building_id = b.id
      WHERE lower(fc.name) LIKE ? OR lower(fc.category) LIKE ? OR lower(fc.description) LIKE ?
      ORDER BY score DESC LIMIT 8
    `;
    db.all(sql, [queryText, searchTerm, searchTerm, searchTerm, searchTerm], (err, rows) => {
      resolve(err ? [] : rows || []);
    });
  });

  Promise.all([searchBuildings, searchDepartments, searchRooms, searchFacilities])
    .then(([bldgs, depts, rooms, facs]) => {
      const combined = [...bldgs, ...depts, ...rooms, ...facs];
      combined.sort((a, b) => b.score - a.score);
      res.json({
        query: queryText,
        total: combined.length,
        results: combined
      });
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
