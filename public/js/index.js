const socket = io();
const form = document.querySelector('#form');
const locationBtn = document.querySelector('#send-location');

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
		msgInput.value = '';
	});
});

locationBtn.addEventListener('click', () => {
	if (!navigator.geolocation) {
		return alert('Geolocation is not supported by your browser.');
	}

	locationBtn.setAttribute('disabled', 'disabled');
	locationBtn.textContent = 'Sending location...';

	navigator.geolocation.getCurrentPosition((position) => {
		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});

		locationBtn.removeAttribute('disabled');
		locationBtn.textContent = 'Send location';
	}, (e) => {
		alert('Unable to fetch location.', e);
		locationBtn.removeAttribute('disabled');
		locationBtn.textContent = 'Send location';
	});
});


socket.on('newMessage', (message) => {
	const newMessage = document.createElement('li');
	newMessage.textContent = `[${message.from}] ${message.text}`;
	document.querySelector('#messages-container').appendChild(newMessage);
});

socket.on('newLocationMessage', (message) => {
	const newMessage = document.createElement('li');

	const link = document.createElement('a');
	link.href = message.url;
	link.setAttribute('target', '_blank');
	link.textContent = 'My current location';

	newMessage.textContent = `[${message.from}]`;
	newMessage.appendChild(link);
	document.querySelector('#messages-container').appendChild(newMessage);
});


socket.on('disconnect', () => {
	console.log('Disconnected from server.');
});