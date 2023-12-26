const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = 3000;

app.use(bodyParser.json());

let players = [];

io.on('connection', (socket) => {
  // Send the current player list to the new client
  socket.emit('updatePlayerList', players);

  socket.on('addPlayer', (playerName) => {
    players.push(playerName);
    // Broadcast the updated player list to all clients
    io.emit('updatePlayerList', players);
  });

  socket.on('disconnect', () => {
    // Handle player disconnect
    io.emit('updatePlayerList', players);
  });
});

app.get('/players', (req, res) => {
  res.json(players);
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
