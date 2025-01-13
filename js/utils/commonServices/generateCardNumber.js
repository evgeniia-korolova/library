export function generateCardNumber() {
	return Math.floor(Math.random() * 0x1000000000)
		.toString(16)
		.padStart(9, '0');
}