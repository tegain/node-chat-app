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
	console.log('Connected to server.');

	socket.emit('newMessage', {
		from: 'Admin',
		text: 'Welcome, new User!'
	});

	socket.broadcast.emit('newMessage', {
		from: 'Admin',
		text: 'A new user joined the chat.',
		createdAt: new Date().getTime()
	});

	socket.on('createMessage', (message) => {
		console.log('New message from client', message);

		// `socket.emit()` emits to only one connection, whereas
		// `io.emit()` emits to every connections
		io.emit('newMessage', {
			...message,
			createdAt: new Date().getTime()
		});

		// `socket.broadcast.emit()` emits an event
		// to everyone but the current connection
		socket.broadcast.emit('newMessage', {
			...message,
			createdAt: new Date().getTime()
		})
	});
});

server.listen(port, () => {
	console.log(`Server is started on port ${port}`);
});
