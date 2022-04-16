import { all, takeLatest } from 'redux-saga/effects';

function* routeChanged() {
	/*
	yield put({
		type: NOTIFICATION_CLEAR,
		payload: null,
	});*/
}

function* onRouteChange() {
	yield takeLatest('@@router/LOCATION_CHANGE', routeChanged);
}

function* Sagas() {
	yield all([onRouteChange()]);
}

export default Sagas;
