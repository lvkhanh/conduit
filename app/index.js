import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import RealworldApp from './RealworldApp';

var App = () => (
    <HashRouter>
        <RealworldApp />
    </HashRouter>
);

ReactDOM.render(
    <App />,
    document.querySelector('#realworld-app')
);
