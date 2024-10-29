const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files (like the frontend HTML, CSS, and JS)
app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for messages from clients
  socket.on('message', (data) => {
    // Broadcast the message to all connected clients
    io.emit('message', data);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
