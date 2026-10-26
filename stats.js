const express = require('express');
const router = express.Router();
const { db } = require('../database');

// GET live statistics for animated counters on dashboard
router.get('/', (req, res) => {
  const queries = {
    buildings: 'SELECT COUNT(*) as count FROM buildings',
    departments: 'SELECT COUNT(*) as count FROM departments',
    floors: 'SELECT COUNT(*) as count FROM floors',
    rooms: 'SELECT COUNT(*) as count FROM rooms',
    facilities: 'SELECT COUNT(*) as count FROM facilities',
    qrLocations: 'SELECT COUNT(*) as count FROM qr_locations WHERE status = "active"'
  };

  const stats = {};
  const keys = Object.keys(queries);
  let completed = 0;

  keys.forEach(key => {
    db.get(queries[key], (err, row) => {
      stats[key] = row ? row.count : 0;
      completed++;
      if (completed === keys.length) {
        res.json(stats);
      }
    });
  });
});

module.exports = router;
