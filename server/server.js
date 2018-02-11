const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const { generateMessage } = require('./utils/message');

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

	socket.emit('newMessage', generateMessage('Admin', 'Welcome, new User!'));

	socket.broadcast.emit('newMessage', generateMessage('Admin', 'A new user joined the chat.'));

	socket.on('createMessage', (message) => {
		console.log('New message from client', message);

		// `socket.emit()` emits to only one connection, whereas
		// `io.emit()` emits to every connections
		io.emit('newMessage', generateMessage(message.from, message.text));

		// `socket.broadcast.emit()` emits an event
		// to everyone but the current connection
		// socket.broadcast.emit('newMessage', generateMessage(message.from, message.text));
	});
});

server.listen(port, () => {
	console.log(`Server is started on port ${port}`);
});
