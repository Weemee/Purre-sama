import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware, ConnectedRouter } from 'connected-react-router';

import { createBrowserHistory } from 'history';

const history = createBrowserHistory();
const middleware = routerMiddleware(history);

import reducers from './reducers';
import App from './modules/app';
import sagas from './sagas';
import ErrorBoundary from './errors';

//CSS
import './styles/merged.scss';

const sagaMiddleware = createSagaMiddleware();
let store;
const remoteDev = false;
let composeEnhancers;

if (!process.env.NODE_ENV || process.env.NODE_ENV !== 'production') {
	console.log('Development SAGA');
	composeEnhancers = remoteDev
		? composeWithDevTools({
				name: 'WoA',
				hostname: 'localhost',
				port: '8000',
				maxAge: 500,
		  })
		: window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

	store = createStore(reducers(history), composeEnhancers(applyMiddleware(sagaMiddleware, middleware)));
} else {
	const createStoreWithMiddleware = applyMiddleware(sagaMiddleware, middleware)(createStore);
	store = createStoreWithMiddleware(reducers(history));
}

sagaMiddleware.run(sagas);

ReactDOM.render(
	<ErrorBoundary>
		<Provider store={store}>
			<ConnectedRouter history={history}>
				<App />
			</ConnectedRouter>
		</Provider>
	</ErrorBoundary>,
	document.querySelector('#root'),
);
