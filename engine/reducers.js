import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import AppReducer from './modules/app/reducer';

const rootReducer = (history) =>
	combineReducers({
		app: AppReducer,
		router: connectRouter(history),
	});

export default rootReducer;
