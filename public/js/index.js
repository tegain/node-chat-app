const socket = io();
const form = document.querySelector('#form');

socket.on('connect', () => {
	console.log('Connected to server.');
});

form.addEventListener('submit', (e) => {
	e.preventDefault();

	socket.emit('createMessage', {
		from: 'user1',
		text: form.elements.namedItem('msgInput').value
	});
});

socket.on('newMessage', (message) => {
	console.log(`New message from ${message.from}:`);
	console.log(message);
});

socket.on('disconnect', () => {
	console.log('Disconnected from server.');
});