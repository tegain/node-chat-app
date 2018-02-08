const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();

// Replaces Express default http module to integrate Socket.io
const server = http.createServer(app);
const io = socketIO(server);

// Middleware for static files; display index.html by default
app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log('New user connected');

	socket.on('disconnect', () => {
		console.log('User disconnected');
	});
});

server.listen(port, () => {
	console.log(`Server is started on port ${port}`);
});