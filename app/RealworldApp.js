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
import withProps from './hocs/withProps';

const TOKEN_KEY = 'jwtToken';

class RealworldApp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true
        };

        this.handleSignIn = this.handleSignIn.bind(this);
        this.handleSignOut = this.handleSignOut.bind(this);
    }

    handleSignIn(user) {
        let {token} = user;
        Storage.set(TOKEN_KEY, token);
        this.user = user;
    }

    handleSignOut(history) {
        this.user = undefined;
        Storage.remove(TOKEN_KEY);
        history.push('/home');
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
        const api = Api,
            handleSignIn = this.handleSignIn,
            handleSignOut = this.handleSignOut;

        if(this.state.loading) {
            return <div>Loading...</div>;
        }

        return (
            <div>
                <Header user={this.user}/>
                <div className="content">
                    <Switch>
                        <Route path="/" exact component={withProps({api})(Home)} />
                        <Route path="/editor" component={EditArticle} />
                        <Route path="/settings" component={withProps({handleSignOut})(Settings)} />
                        <Route path="/login" component={withProps({api, handleSignIn})(SignIn)} />
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
