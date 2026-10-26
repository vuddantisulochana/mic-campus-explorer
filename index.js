const express = require('express');
const cors = require('cors');
const { initDatabase } = require('./database');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('MIC Campus Explorer Backend Live - Fixed!');
});
app.get('/api/health', (req, res) => res.json({status:'ok'}));

initDatabase().then(() => {
  app.listen(PORT, () => console.log(`Server running on ${PORT}`));
}).catch(() => {
  app.listen(PORT, () => console.log(`Server running on ${PORT} without DB`));
});
