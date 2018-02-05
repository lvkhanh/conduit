import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import _ from 'lodash';
import Token from './services/token';
import Storage from './services/storage';
import {logOut, updateUserRequest} from './actions/setting';
import {redirectIfNotAuthenticated} from './services/auth';

class Settings extends Component {

    constructor (props) {
        super(props);
        this.state = {
            user: props.user || {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    handleSignOut () {
        Token.remove();
        Storage.remove('currentUsername');
        this.props.logOut();
        this.props.history.push('/home');
    }

    handleChange (e) {
        let {id, value} = e.target;
        this.setState({
            user: {
                ...this.state.user,
                [id]: value
            }
        });
    }

    handleUpdate (e) {
        e.preventDefault();
        this.props.updateUser(this.state.user);
    }

    componentWillReceiveProps(props) {
        if (!_.isEmpty(this.state.user) && !_.isEqual(props.user, this.state.user)) {
            this.props.history.push(`./profile/${props.user.username}`);
        } else {
            this.setState({
                user: props.user
            });
        }
    }

    componentWillMount () {
        redirectIfNotAuthenticated(this.props.history.push, '/login');
    }

    render () {
        const {user = {}} = this.state,
              {image = '', username = '', bio = '', email = '', password = ''} = user || {};

        //if (!user) return null;

        return  (
            <div className="settings-page">
                <div className="container page">
                    <div className="row">

                        <div className="col-md-6 offset-md-3 col-xs-12">
                            <h1 className="text-xs-center">Your Settings</h1>

                            <form>
                                <fieldset>
                                    <fieldset className="form-group">
                                        <input id="image" className="form-control" type="text" placeholder="URL of profile picture" value={image || ''} onChange={this.handleChange}/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <input id="username" className="form-control form-control-lg" type="text" placeholder="Your Name" value={username} onChange={this.handleChange}/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <textarea id="bio" className="form-control form-control-lg" rows="8" placeholder="Short bio about you" value={bio || ''} onChange={this.handleChange}></textarea>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <input id="email" className="form-control form-control-lg" type="text" placeholder="Email" value={email} onChange={this.handleChange}/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <input id="password" className="form-control form-control-lg" type="password" placeholder="Password" value={password} onChange={this.handleChange}/>
                                    </fieldset>
                                    <button className="btn btn-lg btn-primary pull-xs-right" onClick={this.handleUpdate}>
                                        Update Settings
                                    </button>
                                </fieldset>
                            </form>
                            <hr/>
                            <button className="btn btn-outline-danger" onClick={this.handleSignOut.bind(this)}>
                                Or click here to logout.
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(
    connect(
        ({currentUser}) => ({user: currentUser}),
        dispatch => {
            return {
                logOut: () => {
                    dispatch(logOut());
                },
                updateUser: (user) => {
                    dispatch(updateUserRequest(user));
                }
            };
        }
    )(Settings)
);
