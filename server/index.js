import http from 'http';
import https from 'https';

import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import contentFilter from 'content-filter';

import { stopLookup, realtimeData } from './functions.js';

console.log('Key: ', process.env.SL_REALTIME);

/*
const options = {
	hostname: 'api.sl.se',
	port: 443,
	path: '/api2/typeahead.json?key=164ac08824fd440da6148aa6502c00dc&searchstring=Test&stationsonly=true&maxresults=10',
	method: 'GET',
};

const req = https.request(options, (res) => {
	console.log(`statusCode: ${res.statusCode}`);

	res.on('data', (d) => {
		res.status(res.statusCode).json(d.ResponseData);
	});
});

req.on('error', (error) => {
	console.error(error);
});

req.end();
*/

const app = express();

app.use(bodyParser.json());
app.use(helmet());
app.use(
	bodyParser.urlencoded({
		extended: true,
	}),
);

app.use(
	contentFilter({
		methodList: ['GET', 'POST'],
	}),
);

app.use(function (req, res, next) {
	const origin =
		req.headers.origin == 'http://localhost:8193' ? 'http://localhost:8193' : 'https://worldofatoms.eu:4443';
	//res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8193');

	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8193');
	// Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	// Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers', 'Accept, X-Requested-With, Content-Type, Access-Control-Allow-Origin');
	// Whether requests needs to include cookies in the requests sent to the API. We shouldn't use this unless we retained sessions etc. which we don't!
	res.setHeader('Access-Control-Allow-Credentials', true);
	// Pass to next middleware
	next();
});

const webServerAPI = http.createServer(app);

const routes = express.Router({
	caseSensitive: false,
});

routes.route('/stopLookup').post(stopLookup);
routes.route('/realtimeData').post(realtimeData);

app.use('/api', routes);

webServerAPI.listen(process.env.API_PORT);
console.log(`API listening on port ${process.env.API_PORT}`);

process.on('SIGTERM', async function () {
	process.exit();
});
