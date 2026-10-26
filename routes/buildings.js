const express = require('express');
const router = express.Router();
const { db } = require('../database');

// GET all buildings
router.get('/', (req, res) => {
  db.all('SELECT * FROM buildings ORDER BY name ASC', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    const buildings = rows.map(r => ({
      ...r,
      svg_shape: r.svg_shape ? JSON.parse(r.svg_shape) : null
    }));
    res.json(buildings);
  });
});

// GET single building with floors, departments, and rooms
router.get('/:id', (req, res) => {
  const buildingId = req.params.id;
  db.get('SELECT * FROM buildings WHERE id = ?', [buildingId], (err, building) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!building) return res.status(404).json({ error: 'Building not found' });

    building.svg_shape = building.svg_shape ? JSON.parse(building.svg_shape) : null;

    db.all('SELECT * FROM floors WHERE building_id = ? ORDER BY floor_number ASC', [buildingId], (err2, floors) => {
      if (err2) return res.status(500).json({ error: err2.message });

      const parsedFloors = floors.map(f => ({
        ...f,
        verified_directory: f.verified_directory ? JSON.parse(f.verified_directory) : []
      }));

      db.all('SELECT * FROM departments WHERE building_id = ?', [buildingId], (err3, depts) => {
        if (err3) return res.status(500).json({ error: err3.message });

        db.all('SELECT * FROM rooms WHERE building_id = ?', [buildingId], (err4, rooms) => {
          if (err4) return res.status(500).json({ error: err4.message });

          db.all('SELECT * FROM facilities WHERE building_id = ?', [buildingId], (err5, facilities) => {
            if (err5) return res.status(500).json({ error: err5.message });

            res.json({
              ...building,
              floors: parsedFloors,
              departments: depts,
              rooms: rooms,
              facilities: facilities
            });
          });
        });
      });
    });
  });
});

module.exports = router;
