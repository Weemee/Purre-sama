import { INIT_DONE, SET_LOGGED_IN } from './types';

const defaultState = {
	init: true,
	x: false,
};

export default function (state = defaultState, action) {
	switch (action.type) {
		case INIT_DONE:
			return {
				...state,
				init: false,
			};

		case SET_LOGGED_IN:
			return {
				...state,
				x: true,
			};
	}

	return state;
}
