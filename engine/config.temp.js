const dev = false;
let host = '';

if (dev) {
	host = 'http://localhost';
} else {
	host = '';
}

const Config = {
	socket: {
		host: host + ':8002',
	},

	api: {
		host: host + ':8004',
	},

	// Seconds
	caching: {
		strategies: 300,
	},
};

export default Config;
