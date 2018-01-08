import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';

// pages
import Home from './Home';
import Register from './Register';
import SignIn from './SignIn';
import Article from './Article';
import EditArticle from './EditArticle';
import Settings from './Settings';

class RealworldApp extends Component {
    render() {
        return (
            <div>
                <Header />
                <div className="content">
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/editor" component={EditArticle} />
                        <Route path="/settings" component={Settings} />
                        <Route path="/login" component={SignIn} />
                        <Route path="/register" component={Register} />
                        <Redirect to="/" />
                    </Switch>
                </div>
                <Footer />
            </div>
        );
    }
}

export default RealworldApp;
