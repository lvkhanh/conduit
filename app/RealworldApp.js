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

import Api from './services/api';
import Storage from './services/storage';

const TOKEN_KEY = 'jwtToken';

class RealworldApp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }

    getSignInComponent (routeProps) {
        return (
            <SignIn {...routeProps} api={Api} handleSignIn={this.handleSignIn.bind(this)}/>
        );
    }

    getHomeComponent (routeProps) {
        return (
            <Home {...routeProps} api={Api}/>
        );
    }

    handleSignIn(user) {
        let {token} = user;
        Storage.set(TOKEN_KEY, token);
        this.user = user;
    }

    handleSignOut() {
        this.user = undefined;
        Storage.remove(TOKEN_KEY);
    }

    componentDidMount() {
        let token = Storage.get(TOKEN_KEY);
        if (!token) {
            this.setState({
                loading: false
            });
        } else {
            Api.currentUser(token)
                .then(user => {
                    this.user = user;
                    this.setState({
                        loading: false
                    });
                });
        }
    }

    render() {
        if(this.state.loading) {
            return <div>Loading...</div>;
        }

        return (
            <div>
                <Header user={this.user}/>
                <div className="content">
                    <Switch>
                        <Route path="/" exact component={this.getHomeComponent.bind(this)} />
                        <Route path="/editor" component={EditArticle} />
                        <Route path="/settings" component={(routerProps) => <Settings handleSignOut={() => {
                            this.handleSignOut();
                            routerProps.history.push('/home');
                        }}/>} />
                        <Route path="/login" component={this.getSignInComponent.bind(this)} />
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
