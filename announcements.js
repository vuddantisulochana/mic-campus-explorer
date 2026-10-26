const express = require('express');
const router = express.Router();
const { db } = require('../database');

// GET all active announcements
router.get('/', (req, res) => {
  db.all('SELECT * FROM announcements WHERE active = 1 ORDER BY date DESC', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

module.exports = router;
