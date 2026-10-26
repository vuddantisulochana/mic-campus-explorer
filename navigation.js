const express = require('express');
const router = express.Router();
const { db } = require('../database');
const { findShortestRoute } = require('../routingEngine');

// GET all navigation nodes
router.get('/nodes', (req, res) => {
  db.all('SELECT * FROM nav_nodes ORDER BY label ASC', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// GET all navigation edges for visual path connections
router.get('/edges', (req, res) => {
  db.all('SELECT * FROM nav_edges', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Calculate route between two nodes
router.get('/route', async (req, res) => {
  const fromNode = req.query.from;
  const toNode = req.query.to;

  if (!toNode) {
    return res.status(400).json({ error: 'Destination "to" parameter is required.' });
  }

  try {
    const route = await findShortestRoute(fromNode, toNode);
    res.json(route);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

module.exports = router;



