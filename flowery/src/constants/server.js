const PAYMENT_SERVER_URL = process.env.NODE_ENV === 'production'
	? 'https://quiet-thicket-12667.herokuapp.com/flowery'
	: 'http://localhost:8080/pay';

export default PAYMENT_SERVER_URL;