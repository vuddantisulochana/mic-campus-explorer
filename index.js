const express = require('express');
const cors = require('cors');
const path = require('path');
const { initDatabase } = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../public')));

// API Routes
app.use('/api/buildings', require('./routes/buildings'));
app.use('/api', require('./routes/catalog'));
app.use('/api/search', require('./routes/search'));
app.use('/api/navigation', require('./routes/navigation'));
app.use('/api/qr', require('./routes/qr'));
app.use('/api/announcements', require('./routes/announcements'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/stats', require('./routes/stats'));
app.use('/api/admin', require('./routes/admin'));

// Fallback to index.html for Single Page Application routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Initialize database and launch server
initDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`====================================================`);
      console.log(`🚀 MIC CAMPUS EXPLORER - SMART CAMPUS NAVIGATION`);
      console.log(`🏛️ DVR & Dr. HS MIC College of Technology`);
      console.log(`🌐 Server running at: http://localhost:${PORT}`);
      console.log(`📡 Ready for Map Navigation, Voice Guidance & QR Scan`);
      console.log(`====================================================`);
    });
  })
  .catch(err => {
    console.error('Failed to initialize database:', err);
    process.exit(1);
  });
