import axios from 'axios';

const getData = async (url) => {
	let results;
	await axios
		.get(url)
		.then((res) => {
			console.log(`statusCode: ${res.status}`);
			results = res.data.ResponseData;
		})
		.catch((error) => {
			console.error(error);
		});

	return results;
};

export async function stopLookup(req, res, next) {
	const searchString = req.body.searchString;
	const stationsOnly = req.body.stationsOnly;
	const maxResults = req.body.maxResults;

	const URL = `https://api.sl.se/api2/typeahead.json?key=${process.env.SL_LOCATION}&searchstring=${searchString}&stationsonly=${stationsOnly}&maxresults=${maxResults}&type=S`;
	const results = await getData(URL);

	res.status(200).json(results);
}

export async function realtimeData(req, res, next) {
	const siteID = req.body.siteID;
	const timeWindow = req.body.timeWindow;

	const URL = `https://api.sl.se/api2/realtimedeparturesV4.json?key=${process.env.SL_REALTIME}&siteid=${siteID}&timewindow=${timeWindow}`;
	const results = await getData(URL);

	res.status(200).json(results);
}
