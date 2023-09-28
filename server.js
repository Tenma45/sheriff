const express = require('express');
const http = require('http');
const socketIo = require('socket.io')

const app = express();
const server = http.createServer(app);

const io = socketIo(server,{
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });

  socket.on('chat message', (message) => {
    console.log(`Received message: ${message}`);

    // Broadcast the message to all connected clients
    io.emit('chat message', message);
  });
  
});

const PORT = process.env.PORT || 80;

server.listen(PORT, () => {
  console.log(`WebSocket server is running on port ${PORT}`);
});
