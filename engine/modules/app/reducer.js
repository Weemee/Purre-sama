import { SET_NOTES, CLEAR_NOTES, SET_LOOKUP_DATA, SET_REALTIME_DATA } from './types';

const defaultState = {
	notes: undefined,
	lookupData: [],
	realtimeData: [],
};

export default function (state = defaultState, action) {
	switch (action.type) {
		case SET_NOTES:
			return {
				...state,
				notes: action.payload,
			};

		case CLEAR_NOTES:
			return {
				...state,
				notes: undefined,
			};

		case SET_LOOKUP_DATA:
			return {
				...state,
				lookupData: action.payload,
			};

		case SET_REALTIME_DATA:
			return {
				...state,
				realtimeData: action.payload,
			};
	}

	return state;
}
