const socket = io();
const form = document.querySelector('#form');

socket.on('connect', () => {
	console.log('Connected to server.');
});

form.addEventListener('submit', (e) => {
	e.preventDefault();
	const msgInput = form.elements.namedItem('msgInput');

	socket.emit('createMessage', {
		from: 'user1',
		text: msgInput.value
	}, (data) => {
		console.log('Got it.', data);

		msgInput.value = '';
	});
});

socket.on('newMessage', (message) => {
	console.log(`New message from ${message.from}:`);
	console.log(message);
	const newMessage = document.createElement('li');
	newMessage.innerHTML = `[${message.from}] ${message.text}`;
	document.querySelector('#messages-container').appendChild(newMessage);
});

socket.on('disconnect', () => {
	console.log('Disconnected from server.');
});