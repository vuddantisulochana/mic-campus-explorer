const express = require('express');
const cors = require('cors');
const path = require('path');
const { initDatabase } = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Public folder nundi website chupinchu
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/health', (req, res) => res.json({status:'ok'}));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

initDatabase().then(() => {
  app.listen(PORT, () => console.log(`Server running on ${PORT}`));
}).catch(() => {
  app.listen(PORT, () => console.log(`Server running on ${PORT} without DB`));
});
