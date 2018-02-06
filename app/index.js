import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

import RealworldApp from './RealworldApp';

var App = () => (
    <HashRouter>
        <RealworldApp />
    </HashRouter>
);

// const store = configureStore();

ReactDOM.render(
    // <Provider store={store}>
    //     <App />
    // </Provider>,
    <App />,
    document.querySelector('#realworld-app')
);
