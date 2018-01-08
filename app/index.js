import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';

import RealworldApp from './RealworldApp';

var App = () => (
    <Router>
        <RealworldApp />
    </Router>
);

ReactDOM.render(
    <App />,
    document.querySelector('#realworld-app')
);
