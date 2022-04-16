import { SET_NOTES, CLEAR_NOTES, GET_STOP_LOOKUP, GET_REALTIME_DATA } from './types';

export function setNotes(msg) {
	return {
		type: SET_NOTES,
		payload: msg,
	};
}

export function clearNotes() {
	return {
		type: CLEAR_NOTES,
		payload: null,
	};
}

export function getStopLookup(searchString = '', stationsOnly = true, maxResults = 10) {
	return {
		type: GET_STOP_LOOKUP,
		payload: {
			searchString: searchString,
			stationsOnly: stationsOnly,
			maxResults: maxResults,
		},
	};
}

export function getRealtimeData(siteID = 6019, timeWindow = 60) {
	return {
		type: GET_REALTIME_DATA,
		payload: {
			siteID: siteID,
			timeWindow: timeWindow,
		},
	};
}
