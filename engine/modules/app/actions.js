import { INIT_DONE, SET_LOGGED_IN } from './types';

export function initDone() {
	return {
		type: INIT_DONE,
		payload: null,
	};
}

export function setLoggedIn() {
	return {
		type: SET_LOGGED_IN,
		payload: null,
	};
}
