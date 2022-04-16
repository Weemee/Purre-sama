/* Core */
import axios from 'axios';
import { all, takeLatest, takeEvery, call, put } from 'redux-saga/effects';

/* Config */
import Config from './config';

/* Types */
import {
	SET_NOTES,
	CLEAR_NOTES,
	GET_STOP_LOOKUP,
	GET_REALTIME_DATA,
	SET_LOOKUP_DATA,
	SET_REALTIME_DATA,
} from './modules/app/types';

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

function* doAPICall(endpoint, data, method = 'get', additionalHeaders = {}) {
	const url = `${Config.api.host}/api/`;

	try {
		yield put({
			type: CLEAR_NOTES,
			payload: undefined,
		});

		const request = axios.create({
			baseURL: url,
			timeout: 10000,
			headers: additionalHeaders,
		});

		console.log(`Sending to: ${url}${endpoint}`);

		return yield call(request[method], `${endpoint}`, data);
	} catch (err) {
		let errorMsg = 'Something went wrong! Please try again in a moment.' + err;

		if (err.response) {
			console.log('Error response: ', err.response);
			errorMsg = err.response.data.error || errorMsg;
		}

		console.log('|| Data: ', data);
		console.log('|| Endpoint: ', endpoint);
		console.log('|| Headers: ', additionalHeaders);

		yield put({
			type: SET_NOTES,
			payload: {
				message: errorMsg,
				type: 'error',
			},
		});
	}
}

function* getStopLookup(action) {
	if (action.payload === undefined) {
		return;
	}

	console.log('--- Stop lookup ---');
	const response = yield call(doAPICall, 'stopLookup', action.payload, 'post');

	if (response) {
		const d = response.data;
		console.log('Data: ', d);

		return yield put({
			type: SET_LOOKUP_DATA,
			payload: response.data,
		});
	}

	return yield put({
		type: SET_NOTES,
		payload: {
			message: 'Unknown error::getStopLookup()',
			type: 'error',
		},
	});
}

function* getRealtimeData(action) {
	if (action.payload === undefined) {
		return;
	}

	console.log('--- Realtime data ---');
	const response = yield call(doAPICall, 'realtimeData', action.payload, 'post');

	if (response) {
		const d = response.data;
		console.log('Data: ', d);

		return yield put({
			type: SET_REALTIME_DATA,
			payload: response.data,
		});
	}

	return yield put({
		type: SET_NOTES,
		payload: {
			message: 'Unknown error::getRealtimeData()',
			type: 'error',
		},
	});
}

function* routeChanged() {
	/*
	yield put({
		type: CLEAR_NOTES,
		payload: null,
	});*/
}

function* onGetStopLookup() {
	yield takeLatest(GET_STOP_LOOKUP, getStopLookup);
}

function* onGetRealtimeData() {
	yield takeLatest(GET_REALTIME_DATA, getRealtimeData);
}

function* onRouteChange() {
	yield takeLatest('@@router/LOCATION_CHANGE', routeChanged);
}

function* Sagas() {
	yield all([onRouteChange(), onGetStopLookup(), onGetRealtimeData()]);
}

export default Sagas;
