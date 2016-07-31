import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { hashHistory, browserHistory } from 'react-router';
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './src/reducers';
import App from './src/containers/App';
import DevTools from './src/containers/DevTools';

// DevTools
let devtools = () => (<span></span>);
if (process.env.NODE_ENV === 'development' && !window.devToolsExtension) {
    devtools = DevTools;
}

// History API
let history = browserHistory;
if (process.env.NODE_ENV === 'development') {
    history = hashHistory;
}

// Enchancers for Store
let enhancers = [];
if (process.env.NODE_ENV === 'development') {
    enhancers = [
        ...enhancers,
        window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument()
    ];
}

// Middlewares for Store
const middleware = [
    thunk,
    routerMiddleware(history)
];

// How to create store
const storeCreator = (middleware, enhancers, rootReducer, initialState) =>
    compose(applyMiddleware(...middleware), ...enhancers)(createStore)(rootReducer, initialState);
const store = storeCreator(middleware, enhancers, rootReducer, {});

syncHistoryWithStore(history, store);

// HMR
if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./src/reducers', () => {
        const nextRootReducer = require('./src/reducers');
        store.replaceReducer(nextRootReducer);
    });
}

const Root = () => (
    <Provider store={store}>
        <App history={history} DevTools={devtools} />
    </Provider>
);

render(
    <Root />,
    document.getElementById('root')
);
