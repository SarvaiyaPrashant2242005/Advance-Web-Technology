// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the 'public' folder
app.use(express.static('public'));

// Handle connection
io.on('connection', (socket) => {
  console.log('A user connected');
  
  // Broadcast chat messages
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Listen on port 3000
server.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});
