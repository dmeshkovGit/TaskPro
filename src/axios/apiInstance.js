import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://taskpro-api-j11u.onrender.com',

	headers: {
		'Content-Type': 'application/json',
	},
});

export default instance;
