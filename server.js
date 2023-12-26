const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

let playerNominations = {};

app.get('/nominations', (req, res) => {
  res.json(playerNominations);
});

app.post('/nominations', (req, res) => {
  playerNominations = req.body;
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
