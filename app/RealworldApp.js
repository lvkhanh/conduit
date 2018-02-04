import React, { Component } from 'react';
import { Switch, Route, Redirect, HashRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';

// pages
import Home         from './Home';
import Register     from './Register';
import SignIn       from './SignIn';
import Profile      from './Profile';
import Article      from './Article';
import Settings     from './Settings';
import EditArticle  from './EditArticle';
import Header from './Header';
import Footer from './Footer';

import Token from './services/token';
import Api from './services/api';
import withProps from './hocs/withProps';

import rootReducer from './reducers';
import rootSaga from './sagas';


const RealworldApp = () => {

    const sagas = createSagaMiddleware();
    const store = createStore(rootReducer, {}, applyMiddleware(sagas));

    sagas.run(rootSaga);

    return (
        <Provider store={store}>
            <HashRouter>
                <div>
                    <Header/>
                    <Route path="/login" exact   component={SignIn} />
                    <Footer />
                </div>
            </HashRouter>
        </Provider>
    );
};
/*
class RealworldApp1 extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: undefined,
            loading: true
        };

        this.setUser = this.setUser.bind(this);
        this.removeUser = this.removeUser.bind(this);
    }

    setUser(user) {
        this.setState({user});
    }

    removeUser() {
        this.setState({user: undefined});
    }

    componentDidMount() {
        let token = Token.get();
        if (token) {
            Api
                .currentUser(token)
                .then(user => {
                    this.setState({
                        user,
                        loading: false
                    });
                });
        } else {
            this.setState({
                loading: false
            });
        }
    }

    render() {

        console.log('RealApp render');

        const   {user, loading} = this.state,
                setUser = this.setUser,
                removeUser = this.removeUser;

        return (
            <Provider>
                <HashRouter>
                    <div>
                        <Header user={user} loading={loading}/>
                        <div className="content">
                            <Switch>
                                <Route path="/" exact   component={Home} />
                                <Route path="/login" exact   component={withProps({setUser})(SignIn)} />
                                <Route path="/settings" exact component={withProps({user, setUser, removeUser})(Settings)} />
                                <Route path="/profile/:username" exact component={Profile} />
                                <Route path="/register" component={Register} />

                                <Route path="/article/view/:id"     component={Article} />
                                <Route path="/article/new"          component={EditArticle} />
                                <Route path="/article/edit/:id"     component={EditArticle} />

                                <Redirect to="/" />
                            </Switch>
                        </div>
                        <Footer />
                    </div>
                </HashRouter>
            </Provider>
        );
    }
}*/

export default RealworldApp;
