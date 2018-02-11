const expect = require('expect');
const { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
	it('should generate the correct message object', () => {
		const from = 'Admin';
		const text = 'Hello there';
		const message = generateMessage(from, text);

		expect(message.from).toBe(from);
		expect(message.text).toBe(text);
		expect(typeof message.createdAt).toBe('number');
	});
});

describe('generateLocationMessage', () => {
	it('should generate correct location object', () => {
		const from = 'Mike';
		const latitude = 123;
		const longitude = 456;
		const url = `//www.google.com/maps?q=123,456`;
		const message = generateLocationMessage(from, latitude, longitude);

		expect(message).toMatchObject({
			from,
			url
		});
		expect(typeof message.createdAt).toBe('number');
	});
});